// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

const TEMPLATE_DIR = path.join(
  __dirname,
  'config/semantic-release-gitmoji-templates'
)
const releaseNotesTemplate = readFileAsync(
  path.join(TEMPLATE_DIR, 'default-template.hbs')
)
const commitTemplate = readFileAsync(
  path.join(TEMPLATE_DIR, 'commit-template.hbs')
)

module.exports = {
  branches: [{ name: 'beta', prerelease: true }, { name: 'main' }],

  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseNotes: {
          template: releaseNotesTemplate,
          partials: {
            commitTemplate: commitTemplate,
          },
        },
        // https://github.com/momocow/semantic-release-gitmoji#usage
        // releaseRules: {
        //   major: [ ':boom:' ],
        //   minor: [ ':sparkles:' ],
        //   patch: [
        //     ':bug:',
        //     ':ambulance:',
        //     ':lock:'
        //   ]
        // },
      },
    ],
    [
      '@semantic-release/npm',

      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json'],
        message:
          '🔖 Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/gitlab',
  ],
}
