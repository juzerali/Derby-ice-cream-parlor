
var app, get, ready, render, view, _ref;

_ref = app = require('./index'), get = _ref.get, ready = _ref.ready, view = _ref.view;

render = require('./shared').render;

_ref.post('/!gotopage', function(page, model, _arg) {
  model.setNull('users.default', {createdat: new Date().getTime(), bid: 999999999999})
  var args, body, query;
  body = _arg.body, query = _arg.query;
  var username = _arg.body.username;
  return page.redirect('/'+_arg.body.username);
});


get('/', function(page, model) {
  return model.subscribe('auction', function(err, auction){
  	return render(page, 'home');
  });
});


ready(function(model) {
	window.model=model;
});