
/**
 * Test is given value numeric
 * 
 * @param {*} n, value to be tested
 * @return {boolean} return true if value is considered numeric otherwise false is returned.
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const store = new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    setPlayers( state, players ) {
      state.players = players;
    }
  },
  actions: { 
    async fetchPlayers({commit, state}) {
      const response = await axios.get('/players');
      commit('setPlayers', response.data);
    }
  },
  getters: {
    findPlayerById: state => (id) => {
      return state.players.find( player => player.id === id );
    }
  }
})

Vue.prototype.$store = store;
Vue.prototype.$axios = axios; 

Vue.component('player', {
  template: '#player-template',
  
  props: ['id'],

  computed: {

    player: function() {
      return this.$store.getters.findPlayerById( this.id );
    },

    totalScores: function() {     
      const points = this.player.points;
      return Object.keys(points).reduce((accumalator, currentValue, i) => {
        if( isNumber( points[currentValue] ) ) {
          return points[currentValue] + accumalator;          
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
  
  
  