// 1 CopyCSS
//const { src, dest } = require("gulp");
//const copyFile = () => {  return src(["src/**/*.scss", "!src/pages/**" ]).pipe(dest("build/styles"));};
//exports.copy = copyFile;

// 2 CopyCSS
//const { src, dest } = require("gulp");
//const copyCSS = () => {return src(['./project/**/*.css', '!./project/dist/old/**']).pipe(dest('./server'));}
//exports.copyCSS = copyCSS;

// 3 Watch
//const { watch } = require('gulp');
//const watchers = (done) => {watch('src/sass/app.scss', (done) => {console.log('Что-то меняется!');copyFile();done();});};
//exports.watchers = watchers;

// 4 CopyCSS
//const { src, dest} = require("gulp");
//const copyCSS = () => {
//  return src("./project/**/*.css").pipe(dest("./server/dist/"))};

// 5 Watch + CopyCss
//const { src, dest, watch, parallel, series } = require("gulp");
//const copyCSS = () => {return src("./src/**/*.scss").pipe(dest("./build/"));};
//const watchers_full = () => {watch("./src/**/*.scss", series(copyCSS, (done) => { console.log("Изменения!"); done();}));};
//const watchers_light= () => {watch("./src/**/*.scss", copyCSS);};
//exports.default = watchers_light;
//exports.copyCSS = copyCSS;
//exports.watchers = watchers_full;

// 6 Gulp-Sass
//const { src, dest, watch } = require("gulp");
//const sass = require("gulp-sass")(require("sass"));
//const buildSass = () => {console.log("Компиляция SASS");return src("./src/sass/*.scss").pipe(sass()).pipe(dest("./build/styles/"));};
//const watchers= () => { watch("./src/**/*.scss", buildSass);};
//exports.default = watchers;
//exports.build = buildSass;

// 7 Gulp-Pug, Gulp-Sass, Watch Pug+Gulp
//const { src, dest, parallel, watch } = require('gulp');
//const sass = require("gulp-sass")(require("sass"));
//const pug = require("gulp-pug");
//const buildSass = () => {console.log("Компиляция SASS");return src('./src/sass/*.scss').pipe(sass()).pipe(dest('./build/styles'));}
//const buildPug = () => {console.log('Компиляция Pug');return src('./src/pages/*.pug').pipe(pug()).pipe(dest('./build/'));}
//const watchSass = () => {  watch('./src/**/*.scss', buildSass);}
//const watchPug = () => {  watch('./src/pages/*.pug', buildPug);}
//const watchers = parallel(watchSass, watchPug);
//exports.default = watchers;
//exports.watchSass = watchSass;
//exports.watchPug = watchPug;
//exports.build = parallel(buildSass, buildPug);

// 8 Browser Sync
//const browserSync = require('browser-sync').create();
//const browserSyncJob = () => {browserSync.init({server: "build/"});};
//exports.server = browserSyncJob;

// 9 Development: make /build + server + watch changes on pug and scss files
const { src, dest, parallel, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('./src/sass/*.scss')
    .pipe(sass()).pipe(dest('./build/styles/')).pipe(browserSync.stream());
};

const buildPug = () => {
  console.log('Компиляция Pug');

  return src('./src/pages/*.pug')
    .pipe(pug()).pipe(dest('./build/')).pipe(browserSync.stream());
};

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('./src/sass/*.scss', buildSass);
  watch('./src/pages/*.pug', buildPug);
};

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug);
exports.development = series(parallel(buildSass, buildPug), browserSyncJob);