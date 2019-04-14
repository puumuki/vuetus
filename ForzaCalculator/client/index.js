
/**
 * Test is given value numeric
 * 
 * @param {*} n, value to be tested
 * @return {boolean} return true if value is considered numeric otherwise false is returned.
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const forzaWebsocetClient = new ForzaWebsocketClient();

const store = new Vuex.Store({
  state: {
    connectionDetails: {
      connectionId: false
    },
    players: [],
    websocetConnectionStatus: ForzaWebsocketClient.DISCONNECTED
  },
  mutations: {
    setPlayers( state, players ) {
      state.players = players;
    },
    setConnectionDetails( state, connectionDetails ) {
      state.connectionDetails = connectionDetails;
    },
    playerScoreUpdated( state, data ) {
      const player = state.players.find( player => player.id === data.playerId  );
      
      //If clause here prevent infinite event storm loop..
      // score get updated.. sended to websocet and message comes back and repeat the loop. :3
      if( player.points[ data.value ] != data.score ) {
        player.points[ data.value ] = data.score;

        if( data.sendWebsocket ) {
          forzaWebsocetClient._sendScoreUpdate(data);
        }        
      }    
    },

    setWebsocketConnectionStatus( state, status ) {
      state.websocetConnectionStatus = status;
    }
  },
  actions: { 
    async fetchPlayers({commit, state}) {
      const response = await axios.get('/players');
      commit('setPlayers', response.data);
    },

    playerScoreUpdated({commit, state}, data ) {
      data.sendWebsocket = true; 
      commit('playerScoreUpdated', data);
    },
    setWebsocketConnectionStatus({commit, state}, status ) {
      commit('setWebsocketConnectionStatus', status );
    },
    websocketMessage({commit, state}, message) {
      if( message.type === 'scoreupdated') {
        commit('playerScoreUpdated', message.data);
      }
      if( message.type === 'connection') {
        commit('setConnectionDetails', message.data );
      }     
    }
  },
  getters: {
    findPlayerById: state => (id) => {
      return state.players.find( player => player.id === id );
    }
  }
})

forzaWebsocetClient.subscribe( ForzaWebsocketClient.CONNECTION_STATUS, (status) => {
  store.dispatch('setWebsocketConnectionStatus', status);
});

forzaWebsocetClient.subscribe( ForzaWebsocketClient.MESSAGE, (message) => {
  store.dispatch('websocketMessage', message);
});


forzaWebsocetClient.openConnection();


Vue.prototype.$store = store;
Vue.prototype.$axios = axios; 

Vue.component('player', {
  template: '#player-template',
  
  props: ['id'],

  methods: {
    pointUpdated: function(e){
      this.$store.dispatch("playerScoreUpdated", { 
        playerId: this.id, 
        value: e.currentTarget.dataset.value, 
        score: parseInt(e.target.value)
      });
    }
  },

  computed: {

    player: function() {
      return this.$store.getters.findPlayerById( this.id );
    },

    totalScores: function() {     
      const points = this.player.points;
      
      return [17, 'd', 18, 't', 19, 'r', 20, 'b'].reduce((accumalator, currentValue, i) => {
        if( isNumber( points[currentValue] ) ) {
          return parseInt(points[currentValue]) + accumalator;          
        } else {
          return accumalator;
        }
      },0);
    },
    
    
    /**
     * Validate values that can be scored in different stages of the game.
     * This is used only show visual clue that something is wrong with
     * inputted value. This won't affect what you can write to the field.
     */
    errors: function() {

      const points = this.player.points;
      const baseScores = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; 

      const errors = {
        points:{
          "17": !([0, 17, 17*2, 17*3].includes(points[17])),
          "d":  !( baseScores.map( v => v*2).includes(points.d)),
          "18": !([0, 18, 18*2, 18*3].includes(points[18])),
          "t": !(baseScores.map( v => v*3).includes(points.t)),
          "19": !([0, 19, 19*2, 19*3].includes(points[19])),
          "r": !([0, 41, 82, 123 ].includes(points.r)),
          "20": !([0, 20, 20*2, 20*3].includes(points[20])),
          "b": !([0, 25, 50, 75, 100, 125, 150].includes(points.b))
        }
      };

      return errors;
    }
  }  

});


var app = new Vue({
  el: '.forzacalculator',

  computed: {

    websocketConnectionStatus: function() {
      const connectionStatus = {
        '0': 'Connecting...',
        '1': 'Connected',
        '2': 'Closing',
        '3': 'Closed'
      }
      return connectionStatus[this.$store.state.websocetConnectionStatus.readyState] + ' ' + this.$store.state.connectionDetails.connectionId ;
    },

    header: function() {
      return "Forza Calculator"
    },

    players: function() {
      return this.$store.state.players;
    }
  }, 

  created: function() {
    this.$store.dispatch('fetchPlayers');
  }
});
  
  
  