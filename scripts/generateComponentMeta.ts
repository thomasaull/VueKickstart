/**
 * Heavily copied from
 * @see https://github.com/statelyai/xstate-tools/blob/master/apps/cli/src/bin.ts
 */

import * as url from 'url'
import fs from 'node:fs'
import path from 'path'
import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'
import prettier from 'prettier'
import { Command } from 'commander'
import { watch } from 'chokidar'

// import type { ComponentMetaFinal } from '@/utilities/storybook'

const program = new Command()
const globPattern = './src/**/*.vue'

const __dirname = url.fileURLToPath(new URL('../', import.meta.url))

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  // schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
}

const checker = createComponentMetaChecker(
  path.join(__dirname, './tsconfig.app.json'),
  checkerOptions
)

/**
 * Extract meta and create controls, etc…
 */
async function generateComponentMeta(filePath: string) {
  const componentPath = path.join(__dirname, filePath)

  /**
   * For watch mode we need to update the file content manually,
   * otherwise an old cached version will be used
   */
  const fileContentsOfComponent = fs.readFileSync(componentPath, {
    encoding: 'utf-8',
  })
  checker.updateFile(componentPath, fileContentsOfComponent)

  const componentMeta = checker.getComponentMeta(componentPath)

  const fileContents = {
    argTypes: {
      ...extractPropConrols(componentMeta.props),
      ...extractActions(componentMeta.events),
    },
  }

  /**
   * Save file
   */
  const filePathToSave = filePath.replace(/\.(vue)$/, '.component-meta.ts')
  const prettierConfig = await prettier.resolveConfig(filePathToSave)

  /**
   * @todo JSON.stringify does not preserver `undefined` might need another method
   * of serialization to make this work
   * Or maybe replace string `undefined` after JSON.stringify with String.replace?
   */
  let output = `
    export const componentMeta = ${JSON.stringify(fileContents, null)} as const

    export default componentMeta
  `

  // Replace undefined
  output = output.replace('"{undefined}"', 'undefined')

  const formatted = prettier.format(output, {
    ...prettierConfig,
    parser: 'typescript',
  })

  /**
   * Check if actual file content has changed and only write in this case
   * otherwise a storybook refresh will be triggered
   */
  if (fs.existsSync(filePathToSave)) {
    const oldFileContents = fs.readFileSync(filePathToSave, {
      encoding: 'utf-8',
    })

    const hasChanged = oldFileContents !== formatted
    if (!hasChanged) return
  }

  // console.log('update', filePathToSave)
  await fs.writeFileSync(filePathToSave, formatted)
}

type PropControlStringUnion = {
  control: 'select'
  options: string[]
}

type PropControl = PropControlStringUnion

function extractPropConrols(componentMetaProps: ComponentMeta['props']) {
  const ignoreKeys = ['key', 'ref', 'ref_for', 'ref_key', 'class', 'style']

  const propControls: Record<string, PropControl> = {}

  componentMetaProps.forEach((prop) => {
    const ignoreKey = ignoreKeys.includes(prop.name)
    if (ignoreKey) return

    // Exclude global props
    if (prop.global) return

    // Check if schema is all strings
    if (checkIfAllStringsUnion(prop)) {
      const propControl = createPropControlStringUnion(prop)
      propControls[prop.name] = propControl
      return
    }
  })

  return propControls
}

function checkIfAllStringsUnion(prop: ComponentMeta['props'][number]) {
  const typeItems = prop.type.split('|')
  const ignore = ['undefined', 'null']

  const stringItems = typeItems.filter((typeItem) => {
    const trimmedTypeItem = typeItem.trim()

    /**
     * Ignore certain types like undefined or null
     */
    if (ignore.includes(trimmedTypeItem)) return true

    const startsWithQuote = trimmedTypeItem.startsWith('"')
    const endsWithQuote = trimmedTypeItem.endsWith('"')

    return startsWithQuote && endsWithQuote
  })

  return stringItems.length === typeItems.length
}

function createPropControlStringUnion(prop: ComponentMeta['props'][number]) {
  const options = prop.type.split('|').map((typeItem) => {
    const trimmed = typeItem.trim()
    const withoutQuotes = trimmed.replaceAll('"', '')

    /**
     * Exceptions for certain typoes like undefined or null
     */
    if (withoutQuotes === 'undefined') {
      return '{undefined}'
    }

    if (withoutQuotes === 'null') {
      return null
    }

    return withoutQuotes
  })

  const result: PropControlStringUnion = {
    control: 'select',
    options: options,
  }

  return result
}

type EventListener = `on${Capitalize<string>}`

type ArgTypeAction = {
  action: string
}

// Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter<Type extends string>(string: Type) {
  const result = (string.charAt(0).toUpperCase() +
    string.slice(1)) as Capitalize<typeof string>
  return result
}

function extractActions(componentMetaEvents: ComponentMeta['events']) {
  const argTypeActions: Record<EventListener, ArgTypeAction> = {}

  componentMetaEvents.forEach((event) => {
    // Normalize v-model eventListeners
    const isModelEvent = event.name.search('update:') !== -1
    let eventListener: EventListener = `on${capitalizeFirstLetter(event.name)}`

    if (isModelEvent) {
      const split = event.name.split(':')
      if (!split[0] && !split[1])
        throw new Error('split[0] or split[1] is undefined')

      const firstPart = capitalizeFirstLetter(split[0]) as string
      const secondPart = capitalizeFirstLetter(split[1]) as string
      const merged = capitalizeFirstLetter(`${firstPart}${secondPart}`)

      eventListener = `on${merged}`
    }

    if (eventListener === undefined) return

    argTypeActions[eventListener] = {
      action: event.name,
    }
  })

  return argTypeActions
}

// function runForAll() {
//   const allVueFiles = glob.sync(globPattern)

//   allVueFiles.forEach((filepath) => {
//     generateComponentMeta(filepath)
//   })
// }

program
  .command('generate')
  .description('Generate component meta from vue components')
  .option('-w, --watch', 'Run the generator in watch mode')
  .action(async (options: { watch?: boolean }) => {
    if (options.watch) {
      watch(globPattern, { awaitWriteFinish: true })
        .on('add', generateComponentMeta)
        .on('change', generateComponentMeta)
    } else {
      const tasks: Array<Promise<void>> = []

      watch(globPattern, { persistent: false })
        .on('add', (path) => {
          tasks.push(generateComponentMeta(path))
        })
        .on('ready', async () => {
          await Promise.all(tasks)
          process.exit(0)
        })
    }
  })

program.parse(process.argv)
