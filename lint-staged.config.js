// eslint-disable-next-line no-undef
module.exports = {
  '*.{js,ts,vue}': 'eslint --ignore-path .gitignore --fix',
  '*.{css,scss,vue}': 'stylelint --fix',
  '*': 'prettier -w -u',
}
