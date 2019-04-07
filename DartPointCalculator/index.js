
/**
 * Test is given value numeric
 * 
 * @param {*} n, value to be tested
 * @return {boolean} return true if value is considered numeric otherwise false is returned.
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var app = new Vue({

  el: '.forzacalculator',

  data: {

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

  },


  methods: {
    inputClicked: function( value ) {
      console.log( ":D:D:D:D")
    }
  },

  computed: {

    errors: function() {

      const baseScores = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

      return {
        points:{
          "17": !([0, 17, 17*2, 17*3].includes(this.points["17"])),
          "d":  !( baseScores.map( v => v*2).includes(this.points["d"])),
          "18": !([0, 18, 18*2, 18*3].includes(this.points["18"])),
          "t": !(baseScores.map( v => v*3).includes(this.points['t'])),
          "19": !([0, 19, 19*2, 19*3].includes(this.points["19"])),
          "r": !([0, 41, 82, 123 ].includes(this.points["r"])),
          "20": !([0, 20, 20*2, 20*3].includes(this.points["20"])),
          "b": !([0, 25, 50, 75, 100, 125, 150].includes(this.points['b']))
        }
      };      
    },

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
