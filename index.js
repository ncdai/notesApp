var express = require('express');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(3000);

var data = ["ReactJS", "NodeJS", "AngularJS"];

app.get('/', function(req, res) {
    res.render('trangchu');
});

app.post('/getNotes', function(req, res) {
    res.send(data);
});

app.post('/add', parser, function(req, res) {
    var newNote = req.body.note;
    data.push(newNote);
    res.send(data);
});

app.post('/update', parser, function(req, res) {
    var id = req.body.idSua;
    data[id] = req.body.noiDung;
    res.send(data);
});

app.post('/delete', parser, function(req, res) {
    var id = req.body.idXoa;
    data.splice(id, 1);
    res.send(data);
});
