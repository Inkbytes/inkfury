const { on } = require('events');
const express = require('express');
const app = express();
const path = require('path');
const { Server } = require("socket.io");

var arr = [];

const io = new Server(1337, {
	cors: {
		origin: '*',
	}
});

io.on("connection", (socket) => {
	arr.push(socket.id);
	console.log(`new connection with id: ${socket.id}`);
	socket.emit("client-event", "hello from server!");

	console.log("number of connections " + arr.length);
	if (arr.length === 1){
		socket.emit("initiation", 1);
	}else if (arr.length === 2){
		socket.emit("initiation", 2);
	}

	socket.on("number-of-players", (msg) => {
		socket.emit("number-of-players", arr.length);
	});

	socket.on("game", (data)=>{
		socket.broadcast.emit("game", data);
	})

	socket.on("start-game", (data) => {
		socket.broadcast.emit("start-game", data);
	});
	socket.on("disconnect", () => {
		console.log("socket id" + socket.id + " disconnected");
		arr.splice(arr.indexOf(socket.id), 1);
		console.log("number of connections " + arr.length);
	});
	console.log(arr.length + "  <++++++++");
});


let absolute_path = '/Users/ztaouil/Projects/inkfury/client/';

app.use(express.static(absolute_path));

app.get('/', (req, res) => {
	res.sendFile(path.join(absolute_path, 'index.html'));
});

app.get('/game', (req, res) => {
	res.send('get request to route /game');
});

app.listen(1339, () => {
	console.log('app listening on port 1339');
});
