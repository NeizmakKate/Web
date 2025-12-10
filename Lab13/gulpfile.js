const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const replace = require('gulp-replace');

// Шляхи до файлів
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    },
    html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    }
};

// Очищення папки dist
function clean() {
    return del(['dist']);
}

// Компіляція SCSS в CSS + оптимізація
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// Конкатенація та мініфікація JS
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Оптимізація зображень
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Копіювання HTML з заміною шляхів до CSS
function html() {
    return gulp.src(paths.html.src)
        .pipe(replace(
            /<link rel="stylesheet" href="[^"]*\.scss">/g,
            '<link rel="stylesheet" href="css/style.min.css">'
        ))
        .pipe(gulp.dest(paths.html.dest));
}

// Спостереження за змінами файлів
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.html.src, html);
}

// Основні задачі
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, html));
const dev = gulp.series(build, watch);

// Експорт задач
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.html = html;
exports.watch = watch;
exports.build = build;
exports.default = dev;