var exec = require('child_process').exec

module.exports = function(sessionName) {
  var self = this;

  // create a session if it doesn't exist yet
  self.create_session = function(cb) {
    exec("unset $TMUX; tmux has-session -t " + sessionName,
      function (error, stdout, stderr) {
       console.log(error);
        if (error || stderr) {
          // session doesn't exist, create it
          exec("tmux new-session -d -s " + sessionName+ ";",
            function (error, stdout, stderr) {
              if (error) {
                console.log(error);
              }
              if (stdout) {
                console.log(stdout);
              }
              cb();
            }
          );
        }
        else {
          cb();
        }
      }
    );
  };

  self.run = function(command, windowName, stdout, stderr) {
    command += " > "+stdout+" 2> "+stderr+"; exit;";
    console.log(command);
    // create a session if it doesn't exist yet
    self.create_session(function() {
      exec('tmux new-window -t "'+sessionName+'" -n "'+windowName+'" "'+command+'"',
        function(error, stdout, stderr) {
          if (error) {
            console.log(error);
          }
          if (stdout) {
            console.log(stdout);
          }
        }
      );
    });
  };

  self.kill = function(windowName) {
    // tmux kill-window -t sessionName:windowName
    exec('tmux kill-window -t "'+sessionName+':'+windowName+'"',
      function(error, stdout, stderr) {
        console.log("window "+windowName+" terminated.")
        if (error) {
          console.log(error);
        }
        if (stdout) {
          console.log(stdout);
        }
      }
    );
  }

  return self;
}
