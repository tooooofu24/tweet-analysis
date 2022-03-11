<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- ごちゃごちゃしていたのを全て消して、ボタンを配置 -->
    <button @click="post">click me</button>
  </div>
</template>

<script>
import Methods from "@/api/methods";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    async post() {
      let response = await Methods.getTwitterId("freezed_eng");
      console.log(response.data);
      let id = response.data.id;
      let res = await Methods.getTweets(id);
      console.log(res.data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>