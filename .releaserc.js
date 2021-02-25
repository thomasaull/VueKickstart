module.exports = {
  branch: 'master',
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [':bug:', ':ambulance:', ':lock:'],
        },
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
  ],
}
