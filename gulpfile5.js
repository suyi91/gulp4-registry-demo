/**
 * gulp registry multi registries override demo
 */

// gulp --gulpfile=gulpfile5.js
const { registry, task } = require('gulp');
const DefaultRegistry = require('undertaker-registry');

class CustomTaskRegistry4 extends DefaultRegistry {
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

const config1 = {
  port: 8080,
  host: 'localhost',
}

const config2 = {
  port: 10080,
  host: '127.0.0.1',
}

registry(new CustomTaskRegistry4(config1));
registry(new CustomTaskRegistry4(config2));

task('default', function build(cb) {
  console.log(this.port); // '10080'
  console.log(this.host); // '127.0.0.1'
  cb();
});
