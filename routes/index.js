var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

/**
 * todo list
 * @param req
 * @param res
 */
exports.list = function(req, res, next){
    Todo
        .find({'author' : req.session.username})
        .exec(function(err, todos) {
            if (err) return  next(err);
            res.render('index', {
                title : 'todo',
                todos : todos,
            })
        });
};

exports.add = function(req, res, next) {
    var todo = new Todo({
        author : req.session.username,
        content : req.body.content,
        date : new Date()
    });

    todo.save(function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
};

exports.edit = function(req, res, next) {
    Todo.findById(req.params.id, function(err, todo) {
        if (err) return next(err);
        res.render('edit', {
            title : 'edit',
            todo : todo
        });
    });
};

exports.update = function(req, res, next) {
    Todo.findByIdAndUpdate(req.body.todoId, { $set: { content: req.body.content }}, function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
};

exports.del = function(req, res, next) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
};