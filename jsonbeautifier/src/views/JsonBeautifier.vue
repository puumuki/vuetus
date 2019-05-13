<template>
<div class="">
  <textarea 
    ref="json" 
    name="json"
    placeholder="Place JSON here"
    :value="rawjson"
    @input="parseJSON">
  </textarea>

<pre class="result">
{{formattedJSON}}
</pre>
</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "home",
  computed: {
    ...mapState(["rawjson","formattedJSON", "settings"]),
  },
  methods: {
    parseJSON(e) {
      this.$store.dispatch('setJSON', { rawjson: e.target.value });
    }
  }
};
</script>

<style>
textarea {
  width: 100%;
  min-height: 500px;
}
.result {
  text-align: left;
  overflow-x: auto;  
}
</style>