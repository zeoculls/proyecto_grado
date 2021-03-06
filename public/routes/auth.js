var express = require('express');
var passport = require('passport');
var router = express.Router();



router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users/',
		failure: '/error/'
}));


router.route('/google')
	. get(passport.authenticate('google', {
		access_type: 'online',
		scope:['https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile']	
}));

module.exports = router;