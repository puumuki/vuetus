
class ForzaWebsocketClient {

  constructor( url = 'ws://127.0.0.1:1337' ) {
    this._url = url;
    
    this._eventListeners = {
      'connectionstatus': [],
      'message': []
    }
  }

  //private
  _onConnectionOpen() {
    console.log("Connection open");
    this._commit('connectionstatus', { readyState: this._connection.readyState });
  }

  _onClose() {
    console.log("Connection closed");
    this._commit('connectionstatus', { readyState: this._connection.readyState });

    //Try reconnect to server when a connection fails
    setTimeout(() => {
      this.openConnection();
    }, 1000);
  }

  _onError( error ) {
    this._commit('connectionstatus', { readyState: this._connection.readyState });
    console.log("Connection error", error );
  }

  _onMessage( message ) {

    // try to decode json (I assume that each message
    // from server is json)
    try {
      var data = JSON.parse(message.data);
      this._commit('message', data);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
    }
  }

  _commit( event, data ) {
    this._eventListeners[ event ].forEach((callback) => {
      callback( data );
    });
  }

  //public
  openConnection() {
    // if user is running mozilla then use it's built-in WebSocket
    const WebSocket = window.WebSocket || window.MozWebSocket;
    this._connection = new WebSocket( this._url );

    this._commit('connectionstatus', { readyState: this._connection.readyState });

    this._connection.onopen = this._onConnectionOpen.bind(this);
    this._connection.onerror = this._onError.bind(this);
    this._connection.onclose = this._onClose.bind(this);
    this._connection.onmessage = this._onMessage.bind(this);
  }

  _sendMessage( data ) {
    this._connection.send( JSON.stringify(data) );
  }

  _sendScoreUpdate( data) {
    this._sendMessage({
      type: 'scoreupdated',
      data: data
    });
  }

  subscribe( event, callback ) {
    if( this._eventListeners[ event ] ) {
      this._eventListeners[ event ].push( callback ); 
    } else {
      throw Error("Trying to subcribe to event that does not exist. Event name: " + event);
    }    
  }
}

ForzaWebsocketClient.CONNECTION_STATUS = 'connectionstatus';
ForzaWebsocketClient.MESSAGE = 'message';
