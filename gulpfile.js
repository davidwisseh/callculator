const { src, dest, watch, series } = require("gulp"); /// gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow
const sass = require("gulp-sass")(require("sass")); /// sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS)
const postcss = require("gulp-postcss"); /// postcss is a tool for transforming CSS with JavaScript
const autoprefixer = require("autoprefixer"); /// autoprefixer is a PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use
const cssnano = require("cssnano"); /// cssnano is a modern, modular compression tool written on top of the PostCSS ecosystem, which allows us to use a lot of powerful features in order to compress CSS in the best way
const start = require("react-scripts/scripts/start"); /// react-scripts is a set of scripts and configuration used by Create React App

function scssTask() {
  return src("src/scss/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("src/output", { sourcemaps: "." }));
}

const watchTask = (cb) => {
  watch("src/scss/**/*.scss", scssTask);
  cb();
};

exports.default = series(scssTask, watchTask);
