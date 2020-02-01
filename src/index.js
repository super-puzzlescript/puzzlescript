class PuzzleScript {
  constructor (logger = console) {
    this.puzzleScript = initPuzzleScript(logger)
  }

  compile (source) {
    this.puzzleScript.compile(['restart'], source)
  }
}

module.exports = PuzzleScript

function initPuzzleScript (logger) {
  // We wrap up the necessary PuzzleScript source files as a module.
  // PuzzleScript has a bunch of globals that will now no longer be global.
  // To deal with those cases without modifying the PuzzleScript source, we attach the required global objects to `window`.

  /* eslint-disable no-unused-vars */
  const canSetHTMLColors = false
  const canDump = false
  const canOpenEditor = false
  const canYoutube = false
  const IDE = false
  /* eslint-enable no-unused-vars */

  // Sadly we have to bundle the entirety of the code editor just to compile games.
  const CodeMirror = require('./puzzlescript/js/codemirror/codemirror')
  window.CodeMirror = CodeMirror

  // We include all scripts that are listed in puzzlescript/play.html.
  // Includes are resolved by include-loader.js.
  // @include('./puzzlescript/js/globalVariables')
  // @include('./puzzlescript/js/font')
  // @include('./puzzlescript/js/rng')
  // @include('./puzzlescript/js/riffwave')
  // @include('./puzzlescript/js/sfxr')
  // @include('./puzzlescript/js/colors')
  // @include('./puzzlescript/js/graphics')
  // @include('./puzzlescript/js/engine')
  // @include('./puzzlescript/js/parser')
  // @include('./puzzlescript/js/compiler')
  // @include('./puzzlescript/js/inputoutput')
  // @include('./puzzlescript/js/mobile')

  // Now we include some functions that override those in the PuzzleScript source.
  // @include('./override/parser')
  // @include('./override/debug_off')

  // We wrap some PuzzleScript functions so we can hook into them
  /* global backupLevel:writable, update:writable, level, compile */
  const originalBackupLevel = backupLevel
  backupLevel = function (...args) {
    const backup = originalBackupLevel(...args)
    window.level = level
    return backup
  }

  const originalUpdate = update
  update = function () {
    window.level = level
    originalUpdate()
  }

  return { compile }
}
