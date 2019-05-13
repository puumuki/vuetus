<template>
  <div class="about">
    <h1>About</h1>
    <p>Formatting is done with parsing imputted JSON data with first parsing Javascript native JSON.parse function 
      and then stringifying that data with JSON.stringify function. On Settings tab there is a setting for affect to space
      argument of JSON.stringify function.
    </p>

    <h3>About JSON.stringify( data, replacer, <span class="red">spaces</span> )</h3>


    <p>
    A String or Number object that's used to insert white space into the output JSON string for readability purposes.</p>
    <p>If this is a Number, it indicates the number of space characters to use as white space; this number is capped at 10 (if it is greater, the value is just 10). Values less than 1 indicate that no space should be used.</p>

    <p>If this is a String, the string (or the first 10 characters of the string, if it's longer than that) is used as white space. If this parameter is not provided (or is null), no white space is used.</p>
  </div>
</template>

<style lang="scss" scoped>
.about {

  margin: 0 auto;
  max-width: 600px;

  p {
    text-align: left;
  }
  .red {
    color: red;
  }
}
</style>