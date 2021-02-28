const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const merge = require('merge-stream');

const server = cb => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false,
        open: true
    });
    cb();
}


const css = () => {
    return gulp.src('src/scss/style.scss')
        .pipe(
            sass({
                outputStyle: "compressed"
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

const js = cb => {
    return webpack(require('./webpack.config.js'), (err, stats) => {
        if (err) throw err;
        console.log(stats);
        browserSync.reload();
        cb();
    });
}

const html = () => {
return merge([
    gulp.src('./src/index.html').pipe(gulp.dest('dist')),
]);
};

const htmlReload = cb => {
    browserSync.reload();
    cb();
}

const img = () => {
    return merge([
        gulp.src('./src/images/**/*.*').pipe(gulp.dest('dist/images')),
    ]);
    };


const watch = cb => {
    gulp.watch("src/scss/**/*.scss", {
        usePolling: true
    }, gulp.series(css, img));
    gulp.watch('src/*.html').on('change', gulp.series(html, htmlReload, img));
    gulp.watch('src/js/**/*.js').on('change', gulp.series(js, img));
    cb();
}

exports.default = gulp.series(css, js, html, server, watch);
exports.css = css;
exports.watch = watch;
exports.js = js;
exports.html = html
exports.img = img;