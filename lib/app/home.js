
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
    console.log('inhome');
    return render(page, 'home');
    console.log('outhome');
  });


ready(function(model) {
  var colors, home, titleColor;
  home = model.at('home');
  colors = home.at('colors');
  titleColor = home.at('titleColor');
  titleColor.on('pre:set', function(value, previous, isLocal, e) {
    var titleSelect;
    titleSelect = document.getElementById('titleSelect');
    if (e && e.target.id === 'titleInput') {
      return colors.at(titleSelect.selectedIndex).set('name', value);
    }
  });
  colors.on('pre:set', '*.name', function(index, value, previous, isLocal, e) {
    var titleSelect;
    titleSelect = document.getElementById('titleSelect');
    if (e && e.target.className === 'colorInput' && parseInt(index) === titleSelect.selectedIndex) {
      return titleColor.set(value);
    }
  });
  return app.home = {
    select: function(e, el) {
      return titleColor.set(model.at(el).get('name'));
    }
  };
});