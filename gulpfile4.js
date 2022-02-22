/**
 * gulp registry share data demo
 */

// gulp --gulpfile=gulpfile4.js
const { registry, task } = require('gulp');
const DefaultRegistry = require('undertaker-registry');

class CustomTaskRegistry3 extends DefaultRegistry {
  constructor(config = {}) {
    super(config);
    this.config = config
  }
  set(name, fn) {
    var bound = fn.bind(this.config);
    // Preserve internal properties and task metadata.
    var task = Object.assign(bound, fn);
    // The `DefaultRegistry` uses `this._tasks` for storage.
    this._tasks[name] = task;
    return task;
  }
}

registry(new CustomTaskRegistry3({
  port: 8080,
  host: 'localhost',
}));

task('default', function build(cb) {
  console.log(this.port); // '8080'
  console.log(this.host); // 'localhost'
  cb();
});
