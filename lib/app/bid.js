
var app, get, ready, render, sortableTable, _ref;

_ref = app = require('./index'), get = _ref.get, ready = _ref.ready;

render = require('./shared').render;



get('/:username', function(page, model, _arg) {
  var username = _arg.username;

  if(username === 'default' || username.charAt(0)==='!'){
    page.redirect('/');
    return;
  } 
  else{
    return model.subscribe('_winner', function(err, users){
      //model.ref('_users', 'users');
      users.setNull(username, {createdat: new Date().getTime()});
      model.ref('_user', 'users.'+username);

      /*************************************************************/
      model.fn('_winner', 'users', function(usurp){
        var username;
        try{
          username = Object.keys(usurp); 
        }catch(e){}
         
        model.set("test.0.ts", JSON.stringify(usurp));
        var bids = [];
          try{
          usurp.forEach = function(user){
            if(bids.indexof(user.bid) == -1) bids.push(user.bid);
          };
        }catch(e){}

        bids = bids.sort(function(a,b){ return a-b; });
        
        for(var i=0; i<bids.lengh; i++){

          var winningQuery = model.query('users').where('bid').equals(bids[i]).limit(2);
          var potentialWinners = model.at(winningQuery);
          //console.log("WINNER WINNER WINNER WINNER WINNER WINNER WINNER WINNER ", JSON.stringify(potentialWinners));
          model.set('auction.0.winner', Math.random());
          if(potentialWinners.lengh == 1){ 
            model.set('auction.0.winner', Math.random());
            return;
          }
        }
        model.set('auction.0.winner', model.get("_winner"));
        return username;
      });
      
      /*******************************************************************/


      return render(page, 'bid', {username: username});
    });
  }
});

ready(function(model) {
  window.model = model;/*
  window.bid = function(e){
    //e.preventDefault();
    model.set('_user.bid', Number(document.getElementById('bidvalue').value));
    return false;
  };*/
  exports.bid = function(){
    //e.preventDefault();
    model.set('_user.bid', Math.round(document.getElementById('bidvalue').value));
    return false;
  };

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
