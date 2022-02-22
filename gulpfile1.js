/**
 * gulp registry demo
 */

// gulp --gulpfile=gulpfile1.js

const { registry, task } = require('gulp');
const DefaultRegistry = require('undertaker-task-metadata');

registry(new DefaultRegistry());

task('default', function build(cb) {
  console.log(this.name) // 'default'
  cb();
});
