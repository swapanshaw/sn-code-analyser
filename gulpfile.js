var gulp = require('gulp');
var plugins = require('gulp-load-plugins');

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Minify Bower Components:
gulp.task('group-bower', function () {
    return gulp.src('bower.json')
        .pipe(plugins().mainBowerFiles())
        .pipe(gulp.dest('cleaned/bower_components'));
});

gulp.task('build-bower', function () {
    return gulp.src(['cleaned/bower_components//*.js',
        'cleaned/bower_components///*.js',
        'cleaned/bower_components////*.js'])
        //.pipe(plugins.jshint())
        // .pipe(plugins.uglify())
        .pipe(plugins().concat('bower.scripts.min.js'))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(plugins().livereload());
});