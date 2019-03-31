
/**
 * Data object that is given to vue istance.
 * When a object's property result is written the result are is updated by Vue.
 * This is a just demonstration how vue listens changes to object. 
 */
const calculator = {
  registerA: 0,
  registerB: null,
  result: null,
  operator: null 
};

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
  el: '#app',
  data: calculator,
  methods: {

    pow2: function() {
      this.$data.operator = 'pow2';

      if( isNumber(this.$data.registerA)  ) {
        this.$data.registerA = Math.pow(this.$data.registerA, 2);
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();
    },

    decimal: function( value ) {
      
    },

    num: function( value ) {      
      this.$data.registerA = isNumber( this.$data.registerA ) ? parseFloat(String( this.$data.registerA ) + value ) : parseFloat(value);
      this.$data.result = this.$data.registerA;
    },

    multiply:  function() {
      this.$data.operator = 'multiply';

      if( isNumber(this.$data.registerA) && isNumber(this.$data.registerB)  ) {
        this.$data.registerA = this.$data.registerB * this.$data.registerA;
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();
    },

    divide : function() {
      this.$data.operator = 'divide';

      if( isNumber(this.$data.registerA) && isNumber(this.$data.registerB)  ) {
        this.$data.registerA = this.$data.registerB / this.$data.registerA;
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();      
    },

    sum: function() {
      this.$data.operator = 'sum';

      if( isNumber(this.$data.registerA) && isNumber(this.$data.registerB)  ) {
        this.$data.registerA = this.$data.registerB + this.$data.registerA;
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();
    },

    minus: function() {
      this.$data.operator = 'minus';

      if( isNumber(this.$data.registerA) && isNumber(this.$data.registerB)  ) {
        this.$data.registerA = this.$data.registerB - this.$data.registerA;
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();
    },

    move: function() {
      if( isNumber( this.$data.registerA ) ) {
        this.$data.registerB = this.$data.registerA;
        this.$data.registerA = null;
      }
    },

    c: function() {
      this.$data.registerA = null;
      this.$data.registerB = null;
      this.$data.result = null;
      this.$data.operator = null;
    },

    ce: function() {
      this.$data.registerA = null;
    },    

    abs: function() {
      this.$data.operator = 'abs';

      if( isNumber(this.$data.registerA)  ) {
        this.$data.registerA = Math.abs(this.$data.registerA);
        this.$data.result = this.$data.registerA;  
      }
      
      this.move();      
    },

    equals: function() {
      if( this.$data.operator !== '' ) {
        this[ this.$data.operator ]();
        this.$data.operator = '';
      }
    }

  }
});
