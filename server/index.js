const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
	res.send('hello, world!');
});

app.get('/game', (req, res) => {
	var options = {
		root: '/Users/ztaouil/Projects/inkfury/client'
	};
	console.log(__dirname);
	res.sendFile('/Users/ztaouil/Projects/inkfury/client/index.html');
});

app.listen(3000, () => {
	console.log('app listening on port 3000');
});