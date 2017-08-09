import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import sass         from 'gulp-sass';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS     from'gulp-clean-css';
import plumber from 'gulp-plumber';

gulp.task('styles', function () {

    const createSourcemap = !global.isProd || config.styles.prodSourcemap;

    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(gulpif(createSourcemap, sourcemaps.init()))
        .pipe(sass({
            sourceComments: !global.isProd,
            outputStyle: 'nested',
            includePaths: config.styles.sassIncludePaths
        }))
        .pipe(autoprefixer('last 1 version', 'ie >=10'))
        .pipe(gulpif(global.isProd, cleanCSS({inline: false, rebase: false})))
        .pipe(gulpif(
            createSourcemap,
            sourcemaps.write(global.isProd ? './' : null))
        )
        .pipe(gulp.dest(config.styles.dest))
        .pipe(browserSync.stream());

});
