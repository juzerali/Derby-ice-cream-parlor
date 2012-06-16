
var app, get, ready, render, sortableTable, _ref;

_ref = app = require('./index'), get = _ref.get, ready = _ref.ready;

render = require('./shared').render;



get('/:username', function(page, model, _arg) {
  var username = _arg.username;

  if(username === 'default' || username.charAt(0)==='!' || !username){
    page.redirect('/');
    return;
  } 
  else{
    return model.subscribe('users.'+username,'auction', function(err, user){
      model.setNull('users.'+username, {'createdat': new Date().getTime(), 'bid' : -1});
      model.ref('_user', 'users.'+username);
      
      return render(page,'bid', {});
    });
  }
});

ready(function(model) {
  window.model = model;/*
  window.bid = function(e){
    //e.preventDefault();
    model.set('_user.bid', Number(document.getElementById('bidvalue').value));
    return false;
  };*//*
  exports.bid = function(){
    //e.preventDefault();
    model.set('_user.bid', Math.round(document.getElementById('bidvalue').value));
    return false;
  };*/

  model.set('_showReconnect', true);
  exports.connect = function() {
    model.set('_showReconnect', false);
    setTimeout((function() {
      return model.set('_showReconnect', true);
    }), 1000);
    return model.socket.socket.connect();
  };
  return exports.reload = function() {
    return window.location.reload();
  };
});
