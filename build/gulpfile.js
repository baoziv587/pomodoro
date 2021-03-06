

var gulp = require('gulp');
var tsb = require('gulp-tsb');
var filter = require('gulp-filter');
var es = require('event-stream');
var _ = require('underscore')
var fs = require('fs');
var path = require('path');
var mocha = require('gulp-mocha');
var chai = require('chai')
var cover = require('gulp-coverage')
var exec = require('child_process').exec
var watch = require('gulp-watch')
var incremental = require('./util').incremental
var liveServer = require('gulp-server-livereload')

var rootDir = path.join(__dirname, './../src');
const COMPILE_PATH = './../src/browser/**/**/**';
const CMD_COMPILE_PATH = './../src/menu/**/**'
const TEST_PATH = 'out/**/**/test/**.test.js';

global.chai = chai;

/*----------------------------------------------------------------------------
  BUILD SETTINGS
 ----------------------------------------------------------------------------*/
const buildSettings = require('./buildSettings')
const APP_DIR = ' out';
const APP_NAME = ' Pomodoro';
const PLATFORM = buildSettings.platform;
const ARCH = buildSettings.arch;
const ICON = buildSettings.icon;

// Increase max listeners for event emitters


var toFileUri = function(filePath) {
  var match = filePath.match(/^([a-z])\:(.*)$/i);

  if (match) {
    filePath = '/' + match[1].toUpperCase() + ':' + match[2];
  }

  return 'file://' + filePath.replace(/\\/g, '/');
};



var tsOptions = {
  target: 'ES5',
  module: 'amd',
  preserveConstEnums: true,
  experimentalDecorators: true,
  rootDir: rootDir,
  sourceRoot: toFileUri(rootDir),
  jsx: 'react'
};

function createCompile(build, ops) {
  var opts = ops ? ops : _.clone(tsOptions);
  opts.inlineSources = !!build;

  var ts = tsb.create(opts);

  return function(token) {
    var tsFilter = filter([
      '**/**/**.ts', '**/**/*.d.ts', '**/**.tsx'
    ], { restore: true });
    var input = es.through();
    var output = input
      .pipe(tsFilter)
      .pipe(ts(token))
      .pipe(tsFilter.restore)
    return es.duplex(input, output);
  };
}

function compileAMD(out, build) {
  var compile = createCompile(build);

  return function() {
    var src = gulp.src(COMPILE_PATH)
      .pipe(compile())
      .pipe(gulp.dest(out));
  };

}

function compileCMD(out, build) {
  var cmdOpts = _.clone(tsOptions)
  cmdOpts.module = 'commonjs';
  var compile = createCompile(build, cmdOpts)

  return function() {
    var src = gulp.src('./../src/electron/**/**')
      .pipe(compile())
      .pipe(gulp.dest(out));
  };
}

function buildApp() {
  var shell = ['./node_modules/electron-packager/cli.js ',
    APP_DIR,
    APP_NAME,
    ' --app-copyright ' + '0000',
    ' --icon ' + ICON,
    ' --platform=' + PLATFORM,
    ' --arch=' + ARCH,
    ' --app-version' + '0.10.0',
    ' --build-version' + '0.10.0',
    ' --overwrite'
  ]
  shell = shell.join('');

  exec(shell, function(err, out, stderr) {
    if (err) {
      throw (err);
    }
    if (out) {
      console.log(out);
      return
    }
    if (stderr) {
      console.log(stderr);
    }
  })
}

function testApp() {
  const shell = './node_modules/electron-prebuilt/cli.js ./out/electron/index.js';
  exec(shell, function(err, out, stderr) {
    if (err) {
      throw (err);
    }
    if (out) {
      console.log(out);
      return
    }
    if (stderr) {
      console.log(stderr);
    }
  })
}

function watchCompile(cb) {
  var compile = createCompile(false);
  watch(COMPILE_PATH)
    .pipe(incremental(compile, gulp.src(COMPILE_PATH), true))
    .pipe(gulp.dest('out'))

}

function server() {
  gulp.src('./')
    .pipe(liveServer({
      livereload: {
        enable: true,
        filter: function(filePath, cb) { cb(!(/.DS_Store/.test(filePath))) }
      },
      open: true,
      directoryListing: true

    }))
}

gulp.task('default', ['packing']);
gulp.task('electron', compileCMD('out/electron', false))
gulp.task('compile', ['electron'], compileAMD('out', false))
gulp.task('packing', ['compile'], buildApp)
gulp.task('testapp', testApp)
gulp.task('watch', watchCompile)
gulp.task('server', server)
gulp.task('coverage', function() {
  return gulp.src(TEST_PATH)
    .pipe(cover.instrument({
      pattern: ['out/**/*.js'],
      debugDirectory: 'debug'
    }))
    .pipe(mocha({ ui: 'tdd' }))
    .pipe(cover.gather())
    .pipe(cover.format())
    .pipe(gulp.dest('reports'));

})

gulp.task('test', function() {
  return gulp.src(TEST_PATH)
    .pipe(mocha({ ui: 'tdd' }))

})

