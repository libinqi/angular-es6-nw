'use strict';
/**
 * Created by libinqi on 2016/4/20.
 */

var path = require('path');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();


function webpackWrapper(watch, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']}]
    },
    output: {filename: 'index.module.js'}
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function (err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if (watch) {
      watch = false;
      callback();
    }
  };

  var sources = [path.join(conf.paths.src, '/app/index.module.js')];

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('backend', function () {
  var sources = conf.paths.src + '/domain/**/*.js';
  var gulpChangeHandler = function () {
    gulp.src(sources)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015', 'stage-0']
      }))
      // .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/domain')));
  }

  return gulpChangeHandler();

  gulp.watch(sources, function (event) {
    gulpChangeHandler();
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


gulp.task('scripts', ['backend'], function () {
  return webpackWrapper(false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, callback);
});
