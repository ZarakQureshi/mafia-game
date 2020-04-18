const express = require('express');
const app = express();
const server = require('http').server(app);
const socket = require('socket.io')(server);

//App setup
app.set('views', '/public');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));  // lets the app use URL encoded params instead of params in body. i.e. to get rooms in the URL.

// Static files - this is to access the client side js files.
app.use(express.static('public'));

const rooms = {} // To indicate that at the start there are no rooms defined.

//Routes to be used:
app.get('/', (req, res) =>  { /*We are making a function as the
     second param here, the function we are making takes the
      params req and res. The / as the first param is to
       reference that it is coming from the index path*/
    res.render('index', {rooms: rooms}); /*Here we are saying that
    we should start by rendering the index page (where we start)
    and then this will send us to all the rooms we have*/
})

app.get('/:room', (res, req) =>  { /* The slash colon here is
    defining that the room name is going to come from the
    path (website)/(roomname)  and again it will take a response
    and  request variable*/
    res.render('room', { roomName: req.params.room});
});

server.listen(4000);

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
  console.log("made a socket connection", socket.id);
});
