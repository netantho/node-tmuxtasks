node-tmuxtasks
==============

Node module to execute commands in tmux sessions

Usage
-----

```javascript
// Configure a "my_tmux_session" tmux session
var tmux = require("../lib/tmux")("my_tmux_session");

// Creates the my_tmux_session session
self.create_session(function() {
  // callback function
});

// Run echo "hello world!" in a new "window1" tmux window inside the "my_tmux_session" tmux session
// The session is created if it doesn't already exist
// Store stdout output in stdout.log
// Store stderr output in stderr.log
// Warning: this method is async and without callback
tmux.run('echo "hello world"', 'window1', 'stdout.log', 'stderr.log');

// Kills the window "window1"
tmux.kill('window1');

```
