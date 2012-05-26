
var app, get, ready, render, view, _ref;

_ref = app = require('./index'), get = _ref.get, ready = _ref.ready, view = _ref.view;

render = require('./shared').render;

view.fn('unspace', function(s) {
  return s && s.replace(/\s/g, '');
});

view.fn('capitalize', function(s) {
  return s && s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
});

get('/', function(page, model) {
    return render(page, 'home');
  });


ready(function(model) {
});