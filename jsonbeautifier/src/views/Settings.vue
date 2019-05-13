<template>
  <div class="settings">
    <h1>Settings</h1>

    <label for="space-amount">Spaces</label>
    <input id="space-amount"
          name="spaces"
          type="number"
          :value="settings.spaces"
          @input="updateSpaces">    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: "settings",
  computed: mapState(['settings']),
  //methods: mapActions(['updateSettings']),
  methods: {
    updateSpaces(e) {
      let value = parseInt( e.target.value );
      value = isNaN( value ) ? e.target.value : value;
      this.$store.dispatch('updateSettings', {name:"spaces", value});
    }
  }
  
}
</script>

<style lang="scss" scoped>
.settings {

  margin: 0 auto;
  max-width: 600px;

  label {
    margin-right: 2em;
    font-weight: 600;
  }
  input {
    padding: 0.5em;
  }
}
</style>