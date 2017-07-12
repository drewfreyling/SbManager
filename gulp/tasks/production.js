import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], function(cb) {

    cb = cb || function () {};

    global.isProd = true;

    runSequence(['eslint', 'styles', 'images', 'fonts', 'views', 'env-config'], 'browserify', cb);

});
