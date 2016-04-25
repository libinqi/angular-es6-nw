/**
 *  gulp任务文件分成单独文件存放在项目gulp文件夹下
 *  如果需要添加新的任务，请到项目gulp文件夹下进行操作，避免单个文件代码太多
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  加载项目gulp文件夹下的所有js文件
 *  依次运行gulp任务文件
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  启动默认任务和清理临时目录
 *  serve作为主任务
 */
gulp.task('default', ['clean'], function () {
  gulp.start('serve');
});
