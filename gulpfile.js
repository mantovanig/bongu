var gulp = require( 'gulp' ),
    plumber = require( 'gulp-plumber' ),
    watch = require( 'gulp-watch' ),
    minifycss = require( 'gulp-minify-css' ),
    rename = require( 'gulp-rename' ),
    notify = require( 'gulp-notify' ),
    include = require( 'gulp-include' ),
    svgToSss = require('gulp-svg-to-css'),
    sass = require( 'gulp-sass' ),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require("webpack"),
    gutil = require("gulp-util"),
    webpackConfig = require("./webpack.config.js");

var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  notify.onError("ERROR: " + err.plugin)(err);
  this.emit( 'end' );
}

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
};

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

// gulp.task('lint-js', () => {
//     // ESLint ignores files with "node_modules" paths.
//     // So, it's best to have gulp ignore the directory as well.
//     // Also, Be sure to return the stream from the task;
//     // Otherwise, the task may end before the stream has finished.
//     return gulp.src(['./library/js/*.js','!node_modules/**'])
//         // eslint() attaches the lint output to the "eslint" property
//         // of the file object so it can be used by other modules.
//         .pipe(eslint())
//         // eslint.format() outputs the lint results to the console.
//         // Alternatively use eslint.formatEach() (see Docs).
//         .pipe(eslint.format())
//         // To have the process exit with an error code (1) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(eslint.failAfterError());
// });

/*=============================================>>>>>
= Webpack task =
===============================================>>>>>*/

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
         // output options
     }));
		callback();
	});
});

/*= End of Webpack task =*/
/*=============================================<<<<<*/



gulp.task( 'scss', function() {
  return gulp.src('./library/scss/*.scss')
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe(sourcemaps.write('./maps/'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe( gulp.dest( './library/css/' ) )
    .pipe(notify({
        onLast: true,
        message: function(file) {
          return "Main SASS compiled!";
        }
      }));
} );

gulp.task( 'scss-template', function() {
  return gulp.src('./library/scss/template/*.scss')
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe(sourcemaps.write('./maps/'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe( gulp.dest( './library/css/' ) )
    .pipe(notify({
        onLast: true,
        message: function(file) {
          return "Template SASS compiled!";
        }
      }));
} );

gulp.task( 'scss-minify', function() {
    return gulp.src( './library/css/*.css' )
      .pipe( minifycss() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( './library/css/min/' ) )
} );


gulp.task( 'watch', function() {
  gulp.watch( './library/scss/**/*.scss', [ 'lint-scss', 'scss', 'scss-template', 'scss-minify' ] );
  gulp.watch( './library/js/*.js' , ['webpack:build-dev'] );
  // gulp.watch( './**/*.php' ).on( 'change', function( file ) { } );
} );

gulp.task( 'default', ['build-svg', 'webpack:build-dev', 'lint-scss', 'scss', 'scss-template', 'scss-minify', 'watch' ], function() {

} );
