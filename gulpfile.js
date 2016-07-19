var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  livereload = require( 'gulp-livereload' ),
  minifycss = require( 'gulp-minify-css' ),
  uglify = require( 'gulp-uglify' ),
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
      }))
    .pipe( livereload() );
} );

gulp.task( 'watch', function() {
  livereload.listen();
  gulp.watch( './library/scss/**/*.scss', [ 'scss' ] );
  gulp.watch( './**/*.php' ).on( 'change', function( file ) {
    livereload.changed( file );
  } );
} );

gulp.task( 'default', ['build-svg', 'scss', 'watch' ], function() {

} );
