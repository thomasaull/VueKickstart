module.exports = {
  branch: 'master',
  plugins: [
    'semantic-release-gitmoji',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json'],
        message:
          '🔖 Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
  ]
}
