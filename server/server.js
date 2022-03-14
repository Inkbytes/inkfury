const { on } = require('events');
const express = require('express');
const app = express();
const path = require('path');
const absolute_path = '/Users/ztaouil/Projects/inkfury/client/src/';
const { Server } = require("socket.io");

const io = new Server(1337, {
	cors: {
		origin: '*',
	}
});

io.on("connection", (socket) => {
	console.log(`new connection with id: ${socket.id}`);

	io.emit("client-event", "hello world!");
	socket.on("game", (data)=>{
		console.log(data);
	})
});




app.use(express.static(path.join(absolute_path)));

app.get('/', (req, res) => {
	res.sendFile(path.join(absolute_path, 'index.html'));
});

app.get('/game', (req, res) => {
	res.send('get request to route /game');
});

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
