var express = require('express');
var router = express.Router();



router.get('/', function(req,res){ 
		console.log(req.user);
	console.log('User req.profile:',req.session.passport);
	if (!req.user) {
      // Not logged-in. Authenticate based on Google account.
      console.log('users.js KO');

    } else {
      // Logged in. Associate Twitter account with user.  Preserve the login
      // state by supplying the existing user after association.
      // return done(null, req.user);
      	console.log('users.js logueado ok');
		console.log(req.user);
    }
    res.end;
	//var usuario = { 
    //  nombre: req.user.displayName, 
    //  fotoAvatar: req.user._json.image.url
    // };
    //res.end("<h1>Loqueado oK</h1>");
	//res.render('login', {nombre: req.user.displayName,
	//					 imagen: req.user._json.image.url});
	//res.send(usuario);
	//console.log('usuario');

})

module.exports = router ;