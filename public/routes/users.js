var express = require('express');
var router = express.Router();



router.get('/users', function(req,res){ 
	console.log('logueado ok');
	
	var usuario = { 
      nombre: req.user.displayName, 
      fotoAvatar: req.user._json.image.url
      };
    //res.end("<h1>Loqueado oK</h1>");
	//res.render('login', {nombre: req.user.displayName,
	//					 imagen: req.user._json.image.url});
	res.send(usuario);
	console.log('usuario');

})

module.exports = router ;