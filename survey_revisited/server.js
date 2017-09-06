// require express
const express = require("express");
// path module -- try to figure out where and why we use this
const path = require("path");
const port = process.env.PORT || 8000;
// create the express app
const app = express();
const bodyParser = require('body-parser');


// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

const server = app.listen(8000, () =>
    console.log(`Listen on port ${port}`));

app.get('/', function(req, res) {
    res.render("index.ejs");
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log(`a "user" connected on ${socket.id}`);

    socket.on('posting_form', function(post_data){
        console.log(post_data);
        let rand = Math.floor((Math.random() * 1000) + 1);
        socket.emit('updated_message', { post_data, rand });
    });
});
