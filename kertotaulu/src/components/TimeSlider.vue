<template>
  <div class="timeslider" v-on:click="start()">
    <div class="innerslider" v-bind:style="{ width: width + '%' }">
        {{ isNaN(this.length *  width) ? '' : (this.length * (width/100)).toFixed(1) + ' s' }}
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

export default {

  props: {
    length: Number//Counter length
  },

  data: function() {
    return {
      width: function() {
        return isNaN( this.$data.width ) ? 100 : this.$data.width * 100;
      }
    }
  },

  methods: {
    start() {
      if( this.$data.width < 0 ) {
        this.$data.width = 100;
      }

      if( !this.intervalId ) {
        this.startCounter();
      }
    },

    startCounter() {

      this.$emit('start');
      const startTime = Date.now();

      this.intervalId = setInterval(() => {
        const timeLeftMs = Date.now() - startTime;
        const timeLeftInPercents = 100 - ( (timeLeftMs) / (this.length * 1000 ) * 100 )
        this.$data.width = Math.floor( timeLeftInPercents );
        this.$data.timeLeftMs = timeLeftMs;

        if( this.$data.width <= 0 ) {
          this.stopCounter();
        }
      }, 50);
    },

    stopCounter() {
      clearInterval(this.intervalId);
      delete this.intervalId;
      this.$emit('stop');
    }

  }

}
</script>

<style lang="scss">
.timeslider {
  width: 100%;
  border: solid 1px black;
  height: 1em;

  .innerslider {
    background: green;
    height: 100%;
    color: white;
  }
}
</style>
