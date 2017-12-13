const gulp = require("gulp")
const eslint = require("gulp-eslint")
// const replace = require("gulp-batch-replace")
// const replace = require("gulp-replace")
// const through = require("through2")
const es = require("event-stream")
const { argv } = require("yargs")
const del = require("del")
const { spawn } = require("child_process")
const vars = require("./src/styles/variables.js")

const dirs = {
  source: "src",
  build:  "resource",
}

const paths = {
  gulpfile: "gulpfile.js",
  scripts:  [`${dirs.source}/**/*.js`],
  styles:   [`${dirs.source}/**/*.styles`],
}

const scale = (argv.scale === undefined) ? 1.0 : argv.scale

const batchreplace = (arr) => {
  const replacefn = (ch) => {
    let chunk = ch
    arr.forEach((e) => {
      const [search, replace] = e
      chunk = Buffer.from(String(chunk).replace(search, replace))
    })
    return chunk
  }
  const doReplace = (f, callback) => {
    const file = f
    const isStream = file.contents && typeof file.contents.on === "function" && typeof file.contents.pipe === "function"
    const isBuffer = file.contents instanceof Buffer
    if (isStream) {
      file.contents = file.contents.pipe(es.map((ch, cb) => cb(null, replacefn(ch))))
    } else if (isBuffer) {
      file.contents = replacefn(file.contents)
    }
    callback(null, file)
  }
  return es.map(doReplace)
}

gulp.task("gulp-autoreload", () => {
  let p
  const spawnChildren = function spawnChildren() {
    if (p) p.kill()
    p = spawn("gulp", ["lint-gulpfile", "build", "watch-nogulpfile"], { stdio: "inherit" })
  }
  gulp.watch(paths.gulpfile, spawnChildren)
  spawnChildren()
})

gulp.task("clean", () => del(dirs.build))

gulp.task("lint", () =>
  gulp
    .src([].concat(paths.scripts, paths.gulpfile))
    .pipe(eslint())
    .pipe(eslint.format()))

gulp.task("lint-gulpfile", () =>
  gulp
    .src(paths.gulpfile)
    .pipe(eslint())
    .pipe(eslint.format()))

gulp.task("build", ["clean", "lint"], () =>
  gulp
    .src(paths.styles)
    .pipe(batchreplace(vars.replace(scale)))
    // .pipe(batchreplace([[/FONT_SIZE_13/g, 999]]))
    .pipe(gulp.dest(dirs.build)))

gulp.task("watch", () =>
  gulp.watch([].concat(paths.scripts, paths.styles, paths.gulpfile), ["build"]))

gulp.task("watch-nogulpfile", () =>
  gulp.watch([].concat(paths.scripts, paths.styles), ["build"]))

gulp.task("default", ["build"])

