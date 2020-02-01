# PuzzleScript as a JavaScript Module

Compile and run [PuzzleScript] games through a simple JavaScript API, enabling development in an alternative environment to the [PuzzleScript editor].

Consider using this package as part of the [Super PuzzleScript] development environment.

## Usage

Available as a [UMD] module, it can be [imported by a module bundler](#with-a-module-bundler) (e.g. [Webpack]) or [with an HTML `<script>` element](#with-a-script-element).

### With a module bundler

Install the package with `npm` or `yarn`:

```bash
npm install @super-puzzlescript/puzzlescript
```

Import and create an instance of the `PuzzleScript` class and call the `compile` method with your game code:

```javascript
import PuzzleScript from 'puzzlescript'
import gameSource from './main.ps'

window.onload = () => {
  const puzzleScript = new PuzzleScript()
  puzzleScript.compile(gameSource)
}
```

After bundling with your module bundler of choice, add the bundle to a HTML document containing a `<canvas>` element with ID `gameCanvas`:

```html
<!doctype html>
<html>
  <head>
    <title>Test Game</title>
  </head>
  <body>
    <canvas id="gameCanvas"></canvas>
    <script src="bundle.js"></script>
  </body>
</html>
```

### With a `<script>` element

Add a `<script>` element that imports the PuzzleScript module and then instantiate the global `PuzzleScript` class and call the `compile` method with your game source code. For example, we can fetch the module from [unpkg] (replace `X.Y.Z` in the module URL with the [latest version]):

```html
<!doctype html>
<html>
  <head>
    <title>Test Game</title>
  </head>
  <body>
    <canvas id="gameCanvas"></canvas>
    <script src="https://unpkg.com/@super-puzzlescript/puzzlescript@X.Y.Z/dist/umd/puzzlescript.min.js"></script>
    <script>
const gameSource = `
INSERT GAME CODE HERE
`

window.onload = () => {
  const puzzleScript = new PuzzleScript()
  puzzleScript.compile(gameSource)
}
    </script>
  </body>
</html>
```

## Wrapping PuzzleScript

This package wraps the original [PuzzleScript] source with no modifications. This ensures we don't diverge from PuzzleScript and makes it easier to keep up to date with any PuzzleScript changes.

The downside of this approach is that the PuzzleScript source code has a lot of global state and other implicit dependencies, which makes this package slightly leaky. For example, the level state must be available as a property of the global `window` object for the PuzzleScript engine to run correctly. Additionally, this also means that the package sadly can't be distributed as an ECMAScript module, which always run in strict mode and therefore cannot expose global state to modules that import them.

Another issue with wrapping PuzzleScript in this way is that it depends a small part of the [CodeMirror] code editor for compilation, which means we must bundle the entire CodeMirror source code with this package. This increases the package's file size quite dramatically.

It'll certainly be possible to work around these issues, perhaps with additional tricks in this package or by contributing to PuzzleScript itself, but for now the goal is to make something that works even if it's a little less than ideal.

[CodeMirror]: https://codemirror.net/ "CodeMirror"
[latest version]: https://www.npmjs.com/package/@super-puzzlescript/puzzlescript?activeTab=versions "latest version"
[Super PuzzleScript]: https://super-puzzlescript.github.io/ "Super PuzzleScript"
[PuzzleScript]: https://www.puzzlescript.net/ "PuzzleScript"
[PuzzleScript editor]: https://www.puzzlescript.net/editor.html "PuzzleScript editor"
[UMD]: https://github.com/umdjs/umd "UMD"
[unpkg]: https://unpkg.com/ "unpkg"
[Webpack]: https://webpack.js.org/ "Webpack"
