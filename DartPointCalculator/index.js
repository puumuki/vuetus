
/**
 * Test is given value numeric
 * 
 * @param {*} n, value to be tested
 * @return {boolean} return true if value is considered numeric otherwise false is returned.
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

Vue.component('player', {
  template: '#player-template',
  
  props: ['player'],

  data: function() {
    return {
      points: this.player.points
    }
  },

  methods: {
    pointChanged: function( value, points ) {
      this.player.points[value] = points;
    }
  },

  computed: {
    pointsSum: function() {     
      return Object.keys(this.points).reduce((accumalator, currentValue, i) => {
        if( isNumber( this.points[currentValue] ) ) {
          return this.points[currentValue] + accumalator;          
        } else {
          return accumalator;
        }
      },0);
    }
  }  

});

Vue.component('number-input', {
  template: '#number-input-template',
  
  props: ['value', "player" ],

  data: function() {
    return {
      point: this.player.points[ this.value ]
    };
  },

  watch: {
    point: function() {
      this.$emit('point', this.value, this.point);
    }
  },

  computed: {

    /**
     * Validate values that can be scored in different stages of the game.
     * This is used only show visual clue that something is wrong with
     * inputted value. This won't affect what you can write to the field.
     */
    errors: function() {

      const point = this.point;
      const baseScores = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; 

      return {
        points:{
          "17": !([0, 17, 17*2, 17*3].includes(point)),
          "d":  !( baseScores.map( v => v*2).includes(point)),
          "18": !([0, 18, 18*2, 18*3].includes(point)),
          "t": !(baseScores.map( v => v*3).includes(point)),
          "19": !([0, 19, 19*2, 19*3].includes(point)),
          "r": !([0, 41, 82, 123 ].includes(point)),
          "20": !([0, 20, 20*2, 20*3].includes(point)),
          "b": !([0, 25, 50, 75, 100, 125, 150].includes(point))
        }
      };      
    }
  }

});

window.data = {

  players: [
    {
      id: 1,
      name: 'Teemu',
      points: {
        "17": 17,
        "d": 0,
        "18": 0,
        "t": 0,
        "19": 0,
        "r": 0,
        "20": 0,
        "b": 0
      }
    },
    { 
      id: 2,     
      name: 'VP',
      points: {
        "17": 0,
        "d": 0,
        "18": 0,
        "t": 0,
        "19": 0,
        "r": 0,
        "20": 0,
        "b": 0
      }
    }
  ]
};

var app = new Vue({
  el: '.forzacalculator',

  data: window.data,

  watch: {
    players: function() {
      console.log(":O")
    }
  },

  methods: {
    pointsChanged: function( points ) {
      console.log( points );
    }
  },  
});


