// eslint-disable-next-line no-undef
module.exports = {
  '*.{js,ts,vue}': 'eslint --fix',
  '*.{css,scss,vue}': 'stylelint --fix',
  '*': 'prettier --write --ignore-unknown',
}
