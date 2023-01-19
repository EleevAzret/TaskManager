const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const browserSync = require('browser-sync').create();

//cleaning docs directory
function clean() {
	return del('./docs/*');
}

//task for html files
function html() {
	return gulp.src('./src/**/*.html')
					.pipe(gulp.dest('./docs'));
}

//task compilation main.scss file to css
function styles() {
	return gulp.src('./src/styles/main.scss')
					.pipe(sass().on('error', sass.logError))
					.pipe(autoprefixer())
					.pipe(gcmq())
					.pipe(gulp.dest('./docs/styles'))
					.pipe(browserSync.stream());
}

//task for transfer default css files in docs directory
function defaultStyles() {
	return gulp.src('./src/styles/defaults/**/*')
					.pipe(gulp.dest('./docs/styles/default'));
}

//task for transfer JavaScript files in docs directory
function js() {
	return gulp.src('./src/js/**/*.js')
					.pipe(gulp.dest('./docs/js'));
}

//task for transfer all images in docs directory
function img() {
	return gulp.src('./src/img/**/*')
					.pipe(gulp.dest('./docs/img'));
}

//task that looks for changes in files
function watch() {
	browserSync.init({
		server: {
				baseDir: "./docs/"
		}
	});

	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/styles/**/*.scss', styles);
	gulp.watch('./src/styles/default/**/*', defaultStyles);
	gulp.watch('./src/img/**/*', img);
}

let build = gulp.series(clean, gulp.parallel(html, styles, js, img), watch);

gulp.task('build', build);