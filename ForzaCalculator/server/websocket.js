const _ = require('underscore');

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'ForzaWebsocketServer';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');


// list of currently connected clients (users)
var clients = [];

/**
 * Send a broadcast message to all clients
 * 
 * @param {*} data, message data
 * @param {int} index, client index witch send the orginal message, filters that client out.
 */
function broadCastMessage( data, index ) {
  const _clients = index >= 0 ? clients.filter( (client, i) => { return i != index} ) : clients;

  console.log("Sending broadcast message");

  _clients.forEach( ( client, index ) => {
    console.log("SENDING data to client", index, data );
    client.send( JSON.stringify(data) );
  });
}

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});

server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  
  var index = clients.push(connection) - 1;

  console.log((new Date()) + ' Connection accepted.', index);

  connection.send(JSON.stringify({
    type: 'connection',
    data: {
      connectionId: _.uniqueId()
    }
  }));

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
    
      try {
        const data = JSON.parse( message.utf8Data );
        
        if( data.type === 'scoreupdated'){
          broadCastMessage( data, index );
        }
        
      } catch( error ) {
        console.log( "ERROR", error.message, error.stack )
      }
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    
    // remove user from the list of connected clients
    clients.splice(index, 1);  
  });

});