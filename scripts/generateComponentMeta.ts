/**
 * Heavily copied from
 * @see https://github.com/statelyai/xstate-tools/blob/master/apps/cli/src/bin.ts
 */

import * as url from 'url'
import fs from 'node:fs'
import path from 'path'
import glob from 'glob'
import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'
import prettier from 'prettier'
import { Command } from 'commander'
import { watch } from 'chokidar'

// import type { ComponentMetaFinal } from '@/utilities/storybook'

const program = new Command()
const globPattern = './src/**/ExampleComponent.vue'

const __dirname = url.fileURLToPath(new URL('../', import.meta.url))

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  // schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
}

// const checker = createComponentMetaChecker(
//   path.join(__dirname, './tsconfig.app.json'),
//   checkerOptions
// )

async function generateComponentMeta(filePath: string) {
  // console.log('generateComponentMeta', filePath)

  const componentPath = path.join(__dirname, filePath)

  /**
   * Extract meta and create controls, etc…
   */

  // checker.reload etc don't work properly, so easy/hacky fix is to
  // recreate the checker every time a file should be processed
  const checker = createComponentMetaChecker(
    path.join(__dirname, './tsconfig.app.json'),
    checkerOptions
  )

  const componentMeta = checker.getComponentMeta(componentPath)

  const fileContents = {
    argTypes: {
      ...extractPropConrols(componentMeta.props),
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
   */
  const output = `
    export const componentMeta = ${JSON.stringify(fileContents, null)} as const

    export default componentMeta
  `

  const formatted = prettier.format(output, {
    ...prettierConfig,
    parser: 'typescript',
  })

  console.log(formatted)

  const result = await fs.writeFileSync(filePathToSave, formatted)
  // console.log(result)
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
      return undefined
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
