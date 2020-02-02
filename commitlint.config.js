module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'refactor', 'docs', 'ci', 'perf', 'style', 'test']],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-full-stop': [2, 'never', '.']
  }
}
