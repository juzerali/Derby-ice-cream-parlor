
var pages
, app = require('./index.js')
, get = app.get;
pages = [
  {
    name: 'home',
    text: 'Home',
    url: '/'
  }, {
    name: 'liveCss',
    text: 'Live CSS',
    url: '/live-css'
  }, {
    name: 'tableEditor',
    text: 'Table editor',
    url: '/table'
  }, {
    name: 'leaderboard',
    text: 'Leaderboard',
    url: '/leaderboard'
  }, {
    name: 'bindingsBench',
    text: 'Bindings benchmark',
    url: '/bindings-bench'
  }, {
    name: 'submit',
    text: 'Submit form',
    url: '/submit'
  }, {
    name: 'back',
    text: 'Back redirect',
    url: '/back'
  }, {
    name: 'error',
    text: 'Error test',
    url: '/error'
  }
];

/*get('/', function(page, model){
  return    model.subscribe('auction');
});*/

exports.render = function(page, name, ctx) {
  var i, item, _i, _len;
  if (ctx == null) {
    ctx = {};
  }
  ctx.currentPage = name;
  ctx.pages = [];
  for (i = _i = 0, _len = pages.length; _i < _len; i = ++_i) {
    item = pages[i];
    item = Object.create(item);
    ctx.pages[i] = item;
    if (item.name === name) {
      item.current = true;
      ctx.title = item.text;
    }
  }
  item.isLast = true;
  return page.render(name, ctx);
};

app.ready(function(model){
  model.subscribe('auction');
});