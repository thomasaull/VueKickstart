# Use Vue

- Remove every occurance of `process.client`

# Use nuxt

Nuxt is currently not included in the package.json and might need some more work to get it running.

- Add async to `createRouter()` in `router.js`
- Rename `babel.config.js` `no-babel.config.js`

# Filter commits from `git blame`
- Update `.git-blame-ignore-revs`
- Add the following to `/git/config`
```
[blame]
	ignoreRevsFile = .git-blame-ignore-revs
```