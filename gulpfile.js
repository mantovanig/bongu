var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  minifycss = require( 'gulp-minify-css' ),
  rename = require( 'gulp-rename' ),
  notify = require( 'gulp-notify' ),
  include = require( 'gulp-include' ),
  svgToSss = require('gulp-svg-to-css'),
  sass = require( 'gulp-sass' );

  var onError = function( err ) {
    console.log( 'An error occurred:', err.message );
    notify.onError("ERROR: " + err.plugin)(err);
    this.emit( 'end' );
  }


gulp.task( 'build-svg', function() {
  return gulp.src('**/*.svg', {cwd: './library/svg'})
    .pipe(svgToSss('svg.css'))
    .pipe(gulp.dest('./library/css/icons'));
} );

// Sass lint
gulp.task('lint-scss', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src(['./library/scss/**/*.scss'])
    .pipe(gulpStylelint({
        syntax: 'scss',
        reporters: [
            {
                formatter: 'string', console: true
            }
      ]
    }));
});

gulp.task( 'scss', function() {
  return gulp.src( './library/scss/*.scss' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( gulp.dest( './library/css/' ) )
    .pipe( minifycss() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './library/css/min/' ) )
    .pipe(notify({
        onLast: true,
        message: function(file) {
          return "SASS compiled!";
        }
      }));
} );

gulp.task( 'watch', function() {
  gulp.watch( './library/scss/**/*.scss', [ 'lint-scss', 'scss' ] );
  // gulp.watch( './**/*.php' ).on( 'change', function( file ) { } );
} );

gulp.task( 'default', ['build-svg', 'lint-scss','scss', 'watch' ], function() {

} );
