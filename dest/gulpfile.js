var gulp=require("gulp"),build=require("gulp-build"),uglify=require("gulp-uglify"),gulpIf=require("gulp-if"),gulpIgnore=require("gulp-ignore"),jshint=require("gulp-jshint");gulp.task("build",function(){gulp.src("views/js/built/*.js").pipe(build({GA_ID:"0.0.1"})).pipe(gulpIf("*.js",uglify())).pipe(gulp.dest("dest"))}),gulp.task("task",function(){gulp.src("./**/**/*.js").pipe(jshint()).pipe(uglify()).pipe(gulp.dest("dest"))});