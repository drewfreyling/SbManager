import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function (cb) {
    global.isProd = false;
    runSequence(['eslint', 'styles', 'images', 'fonts', 'views', 'env-config'], 'browserify', 'watch', cb);

});
