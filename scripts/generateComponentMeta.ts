import * as url from 'url'
import fs from 'node:fs'
import path from 'path'
import glob from 'glob'
import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'
import prettier from 'prettier'

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

// const allVueFiles = glob.sync('./src/**/*.vue')
const allVueFiles = glob.sync('./src/**/ExampleComponent.vue')

allVueFiles.forEach((filepath) => {
  generateComponentMeta(filepath)
})

async function generateComponentMeta(filePath: string) {
  const componentPath = path.join(__dirname, filePath)

  /**
   * Extract meta and create controls, etc…
   */
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

  const output = `
    export const componentMeta = ${JSON.stringify(fileContents)} as const

    export default componentMeta
  `

  const formatted = prettier.format(output, {
    ...prettierConfig,
    parser: 'typescript',
  })

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

  const stringItems = typeItems.filter((typeItem) => {
    const trimmedTypeItem = typeItem.trim()
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

    return withoutQuotes
  })

  const result: PropControlStringUnion = {
    control: 'select',
    options: options,
  }

  return result
}
