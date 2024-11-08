const { src, dest, series, watch } = require('gulp');

// styles
const scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');

function styles() {
    return src('./PORTFOLIO/0xfolio/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoPrefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(dest('./PORTFOLIO/0xfolio/scss/'))
}

// scripts
const jsMinify = require('gulp-terser');

function scripts() {
    return src('./PORTFOLIO/0xfolio/js/**/*.js')
        .pipe(jsMinify())
        .pipe(dest('./frontend/dist/js/'))
}

function watchTask() {
    watch(
            [
            './fPORTFOLIO/0xfolio/scss/**/*.scss',
            './PORTFOLIO/0xfolio/js/**/*.js'
            ],
            series(styles, scripts)
        )
}

exports.default = series(styles, scripts, watchTask);

exports.build = series(styles, scripts);