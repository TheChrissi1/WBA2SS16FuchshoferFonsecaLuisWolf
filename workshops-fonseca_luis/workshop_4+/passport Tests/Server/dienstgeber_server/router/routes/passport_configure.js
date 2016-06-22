var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');
var Q = require('q');

//passport.use local-signin
passport.use('local-signin', new LocalStrategy(
  {usernameField: 'username', passwordField: 'password', passReqToCallback : true},
  function( req, username, password, done ){
    localAuth( username, password ).then(function( pw ){
      if( pw ){
        var user = {
          "username":username,
          "password":pw
        };
        console.log(pw);
        console.log('Logged in as User ID: ' + username );
        req.session.success = 'You are successfully logged in ' + username + '!';
        done( null, user );
      }
      if( !user ){
        console.log('Could not login');
        req.session.error = 'Could not Login. Please try again.';
        done(null, user);
      }
    }).fail(function( err ){
      console.log(err.body);
    });
  }));
//passport.use local-signup
passport.use('local-signup', new LocalStrategy( {usernameField: 'username', passwordField: 'password', passReqToCallback : true },
  function( req, username, password, done ){
    localReg( username, password ).then( function( user ){
      if( user ){
        console.log('Registered user ID: ' + username);
        req.session.success = 'You are successfully registered and logged in as ID: ' + username + '!';
        done( null, user.user_id );
      }
      if( !user ){
        console.log('Could not register');
        req.session.err = 'This should not have happened. Please Contact Admins/Support';
        done( null, user );
      }
    }).fail( function( err ){
      console.log( err );
    });
  }));
//passport.use local-change

console.log('loaded passport_functions.js');

passport.serializeUser(function(user, done){
  done( null, user.username);
});
passport.deserializeUser(function(username, done){
  User.findByID(username, function( err, user){
    done( err, user );
  });
});

////////


function localReg( username, password ){
  var deferred = Q.defer();
  var hash = bcrypt.hashSync( password, 8 );
  var user = {
    "username" : username,
    "password": hash
  };
  db.get('auth:' + user.username, function( result ){
    if( result ){
      console.log('User ID already exists');
      deferred.resolve( false );
    } else {
      db.set('auth:' + user.username , user.password, function ( err ){
        if( err ){
          console.log( err );
          deferred.reject(new Error(err));
        } else {
          deferred.resolve(JSON.stringify(user));
        }
      });
    }
  });
  return deferred.promise;
};

function localAuth( username, password ){
  var deferred = Q.defer();
  db.get('auth:' + username, function( err, result ){
    if( result ){
      console.log('Found User');
      var hash = result;

      if( bcrypt.compareSync( password, hash )){
        deferred.resolve( result );
      } else {
        console.log('Wrong Password');
        deferred.resolve( false );
      }
    } else {
      console.log( err );
      console.log( 'Could not find User');
    }
  });
  return deferred.promise;
};


///////

module.exports = passport;
