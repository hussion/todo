var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function(req, res){
    res.render('login', {title : 'login', error : ''});
};

exports.doLogin = function(req, res) {
    if (!(req.session.username == req.body.username))
        User.find({username : req.body.username, password : req.body.password})
            .exec(function(err, users) {
                if (err) return next(err);
                if (users.length == 0) {
                    res.render('login', {
                        title : 'login',
                        error : 'username or password incorrect'
                    });
                } else {
                    req.session.username = req.body.username;
                    res.redirect('/');
                }

            });
    else
        res.redirect('/');
};

exports.reg = function(req, res) {
    res.render('reg', {title : 'registry'});
};

exports.doReg = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var user = new User({
        username : username,
        password : password,
        nickname : nickname
    });
    user.save(function(err) {
        if (err) return next(err);
        res.redirect('/login');
    });
};