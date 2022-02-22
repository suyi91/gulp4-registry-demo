/**
 * gulp registry custom task demo
 */

// gulp --gulpfile=gulpfile3.js

const { registry, task, series } = require('gulp')
const DefaultRegistry = require('undertaker-registry');

class CustomTaskRegistry2 extends DefaultRegistry {
  constructor(options = {}) {
    super(options)
    this.name = options.name
  }

  init(gulpInst) {
    gulpInst.task(this.name, cb => {
      console.log('in CustomTaskRegistry2:' + this.name)
      cb()
    })
  }
}

registry(new CustomTaskRegistry2({ name: 'myTask' }))

task('default', series('myTask', cb => {
  console.log('in default')
  cb()
}))
