const { src, dest } = require("gulp");


const copyFile = () => {
  return src(["src/**/*.scss", "!src/pages/**" ]).pipe(dest("build/styles"));
};

exports.copy = copyFile;



const { src, dest } = require("gulp");

const copyCSS = () => {
  return src(['./project/**/*.css', '!./project/dist/old/**']).pipe(dest('./server'));
}

exports.copyCSS = copyCSS;