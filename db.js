var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    nickname : String,
    username : String,
    password : String
});

var Todo = new Schema({
    author : String,
    content : String,
    date : Date
});

mongoose.model('User', User);
mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/todo');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log('数据库连接成功！')
});