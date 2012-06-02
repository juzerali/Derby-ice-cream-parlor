require('derby').run(__dirname + '/lib/server', process.env["app_port"] || 3001);
