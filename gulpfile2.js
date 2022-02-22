/**
 * gulp registry share task demo
 */

// gulp --gulpfile=gulpfile2.js

const { registry, task, series } = require('gulp')
const DefaultRegistry = require('undertaker-registry');

class CustomTaskRegistry extends DefaultRegistry {
  init(gulpInst) {
    gulpInst.task('customTask', cb => {
      console.log('in CustomTaskRegistry:customTask')
      cb()
    })
  }
}

registry(new CustomTaskRegistry())

task('default', series('customTask', cb => {
  console.log('in default')
  cb()
}))
