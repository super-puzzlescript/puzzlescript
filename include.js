const { readFile } = require('fs').promises
const MagicString = require('magic-string')
const path = require('path')

const INCLUDE_REGEX = /\/\/\s*@include\(["'](?<filename>.+)["']\)/gm

function include (options = {}) {
  return {
    name: 'include',
    transform: async (code, id) => {
      const directoryPath = path.dirname(id)

      const source = new MagicString(code)

      for (const match of eachMatch(INCLUDE_REGEX, code)) {
        const startIndex = match.index
        const endIndex = startIndex + match[0].length

        const includePath = require.resolve(path.join(directoryPath, match.groups['filename']))
        const includeSource = (await readFile(includePath)).toString()
          .replace(/typeof exports/g, 'typeof undefined')

        source.overwrite(startIndex, endIndex, includeSource)
      }

      return {
        code: source.toString(),
        map: source.generateMap({ hires: true })
      }
    }
  }
}

function * eachMatch (regex, text) {
  let match
  while ((match = regex.exec(text))) {
    yield match
  }
}

module.exports = { include }
