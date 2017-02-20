var gulp = require('gulp'),
    http = require('http'),
    ecstatic = require('ecstatic'),
    path = require('path'),
    gutil = require('gulp-util'),
    ghpages = require('gh-pages'),
    pug = require('gulp-pug');

gulp.task('build:html', function() {
	gulp.src('src/*.pug')
	    .pipe(pug({pretty: true}))
	    .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function() {
	gulp.src('src/styles/*')
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', function() {
	gulp.src('src/scripts/*')
	    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['build'], function() {
	gulp.watch(['src/*.pug', 'src/includes/*.pug'], ['build:html']);
	gulp.watch('src/styles/*', ['build:css']);
	gulp.watch('src/scripts/*', ['build:js']);
});

gulp.task('serve', ['watch'], function() {
        http.createServer(
                ecstatic({ root: __dirname + '/dist' })
        ).listen(8080);
});

gulp.task('deploy', ['build'], function(done) {
        ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log, branch: 'master' }, done);
});

gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('default', ['serve']);
