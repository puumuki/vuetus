<template>
  <div class="kertolaskutesti">
    <h1>Kertolaskutesti</h1>

    <TimeSlider v-bind:length="8.0" />

    <div v-for="question in questions">
      {{question.a}} * {{question.b}}
    </div>

  </div>
</template>

<script>

import TimeSlider from '@/components/TimeSlider.vue'

export default {
  name: 'kertolaskutesti',

  components: {
    TimeSlider
  },

  data: function() {
    return {
      questions: [
        {
          a: 5, b: 5
        },
        {
          a: 4, b: 3
        }
      ]
    }
  }

}

</script>
