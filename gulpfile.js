var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
//http://www.browsersync.cn/docs/gulp/
//参考文档
var jshint = require('gulp-jshint');//格式化
var concat = require('gulp-concat');//连接
var uglify = require('gulp-uglify');//压缩

gulp.task('default',['script','style'],function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch('./css/*.scss',['style']);
    gulp.watch('index.html').on('change',reload);
    gulp.watch('./scripts/*.js',['js-watch']);
});

gulp.task('js-watch',['script'],reload);

gulp.task('style',function(){
   return gulp.src('./css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dest'))
    .pipe(reload({stream:true}));
});

gulp.task('script',function(){
    return gulp.src('./scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))//输出类型为默认
    .pipe(jshint.reporter('fail'))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dest'))
    .pipe(reload({stream:true}));
  
});

/**
 * first example
 */
// /**
//  * 如果不加concat，所有文件输出到一个文件中
//  */
// gulp.task('default',['test'],function(){
//     console.log('I am the second');
//     gulp.src(['./scripts/*.js'])//.pipe(concat('index.js'))
//     .pipe(gulp.dest('./dest'));
// });

// gulp.task('test',function(){
//     console.log('I am the first');
// }); 
