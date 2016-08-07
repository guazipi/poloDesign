/**
 * Created by Administrator on 2016/7/15.
 */
var gulp = require('gulp');
//gulp.task('default',function(){
//    console.log('hello world');
//});
//
////*********************************uglify 模块（用于压缩 JS）******************************
//// 获取 uglify 模块（用于压缩 JS）
//var uglify = require('gulp-uglify');
//// 压缩 js 文件
//// 在命令行使用 gulp script 启动此任务
//gulp.task('script', function() {
//    // 1. 找到文件
//    gulp.src('js/lib.js')
//        // 2. 压缩文件
//        .pipe(uglify())
//        // 3. 另存压缩后的文件
//        .pipe(gulp.dest('dist/js/*.min.js'))
//})
////*********************************jsHint,用于检测JavaScript语法错误******************************
//var jshint = require('gulp-jshint');
//
//gulp.task('jshint', function () {
//    gulp.src('js/lib.js')
//        .pipe(jshint())       // 进行检查
//        .pipe(jshint.reporter('default')); // 对代码进行报错提示;
//});
//
//gulp.task('default', ['jshint']);

////*********************************jsdoc3,用于生成JavaScript API文档******************************
var jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './queueJsdocTest.js'], {read: false})
        .pipe(jsdoc(cb));
});
gulp.task('default', ['doc']);
