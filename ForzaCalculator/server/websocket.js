const _ = require('underscore');
var WebsocketServer = require('websocket').server;

class ForzaWebsocketServer extends WebsocketServer {

  constructor( server ) {
    super({ httpServer: server});
    this._clients = [];
    this.on('request', this._onRequest.bind(this));
  }

  /**
   * Handle incoming message from the clients.
   * 
   * @param {integer} index, request sender's index in clients array 
   * @param {object} message, websocket message object
   */
  _onMessage( index, message ) {

    if (message.type === 'utf8') { // accept only text
      
      try {
        const data = JSON.parse( message.utf8Data );
        
        if( data.type === 'scoreupdated'){
          this._broadCastMessage( data, index );
        }
        
      } catch( error ) {
        console.log( "ERROR", error.message, error.stack )
      }
    }
  }

  /**
   * Send a broadcast message to all clients
   * 
   * @param {*} data, message data
   * @param {int} index, client index witch send the orginal message, filters that client out.
   *                     If left falsy message is broadcasted to everyone.
   */
  _broadCastMessage( data, index ) {
    const _clients = index >= 0 ? this._clients.filter( (client, i) => { return i != index} ) : this._clients;

    console.log("Sending broadcast message");

    _clients.forEach( ( client, index ) => {
      console.log("SENDING data to client", index, data );
      client.send( JSON.stringify(data) );
    });
  }


  _onRequest( request ) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    const connection = request.accept(null, request.origin); 

    // we need to know client index to remove them on 'close' event
    const index = this._clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.', index);

    connection.send(JSON.stringify({
      type: 'connection',
      data: {
        connectionId: _.uniqueId()
      }
    }));
    
    // user sent some message
    connection.on('message', this._onMessage.bind(this, index));

    // user disconnected
    connection.on('close', this._onConnectionClose.bind(this, index));    
  }


  _onConnectionClose( index, connection ) {
    console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
      
    // remove user from the list of connected clients
    this._clients.splice(index, 1);  
  }


}

module.exports = {
  ForzaWebsocketServer
}