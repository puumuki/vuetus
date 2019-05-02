const websocket3 = require('./websocket');
const express = require('express');
const player = require('./player');
const app = express();
const port = 80;

app.use(express.static('../client'))

app.get('/players', (req, res) => {
  res.json([
    player.createPlayer(1, 'Teemu'),
    player.createPlayer(2, 'VP'),
    player.createPlayer(3, 'Player')
  ]);
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const forzaWebsocketServer = new websocket3.ForzaWebsocketServer( server );


