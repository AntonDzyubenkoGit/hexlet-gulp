const { parallel } = require("gulp");

const myFirstGulpTask = (done) => {
  console.log('My First Gulp Task Completed');

  done()
};

const mySecondGulpTask = (done) => {
  console.log('My Second Gulp Task Completed');

  done()
};


exports.default = parallel(myFirstGulpTask, mySecondGulpTask)
exports.myFirstGulpTask = myFirstGulpTask;
exports.mySecondGulpTask = mySecondGulpTask;