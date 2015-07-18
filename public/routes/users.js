var express = require('express');
var router = express.Router();




router.use('/', function(req,res,next){
  if(!req.user){
    res.redirect('/');
  }
  next();
})

router.get('/', function(req,res){ 
  if (!req.user) {
      // Not logged-in. Authenticate based on Google account.
      console.log('Usuario no logueado KO');

    } else {
      // Logged in. Associate Twitter account with user.  Preserve the login
      // state by supplying the existing user after association.
      // return done(null, req.user);
      	console.log('User logueado ok');
        console.log('Nombre:',req.user.usuario);
        console.log('Avatar:',req.user.fotoAvatar);
        //res.render('login', { user: { nombre: req.user.usuario,
        //    fotoAvatar: req.user.fotoAvatar}});
        res.redirect('/');

    };

})

module.exports = router ;