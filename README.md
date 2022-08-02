# Setup

- Use Takeover mode: https://vuejs.org/guide/typescript/overview.html#takeover-mode

# Some reading material

- https://miyauchi.dev/posts/vite-vue3-typescript/

# Filter commits from `git blame`

- Update `.git-blame-ignore-revs`
- Add the following to `/git/config`

```
[blame]
	ignoreRevsFile = .git-blame-ignore-revs
```

### Todo

- [ ] Prefix .env variables with `VITE`, see: https://vitejs.dev/guide/env-and-mode.html#env-variables
- [ ] Use glob import for icons: https://vitejs.dev/guide/features.html#glob-import
