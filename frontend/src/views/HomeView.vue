<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Chips from "primevue/chips";
import Card from "primevue/card";
import Badge from "primevue/badge";
import Chip from "primevue/chip";
</script>

<template>
  <main>
    <form action="" @submit.prevent="main()">
      <div class="p-inputgroup mb-2">
        <span class="p-inputgroup-addon">
          <i class="pi pi-search mr-2"></i>
          検索ワード
        </span>
        <Chips v-model="searchWords" class="p-chips" />
      </div>
      <div class="p-inputgroup mb-3">
        <InputText
          placeholder="Your Account Id"
          class="p-inputtext-lg"
          v-model="username"
          required
        />
        <Button label="解析する" type="submit" />
      </div>
    </form>
    <Panel header="解析結果">
      <div class="flex">
        <div class="flex-0 flex align-items-center justify-content-center px-2">
          <img alt="プロフィール画像" :src="user.iconUrl" />
        </div>
        <div class="flex-0 flex align-items-center justify-content-center px-2">
          {{ user.name }}
        </div>
        <div class="flex-1 flex align-items-center justify-content-center">
          <span v-for="(word, index) in searchWords" :key="index" class="px-2">
            <Chip :label="word" class="px-2" v-badge="counts[word]" />
          </span>
        </div>
      </div>
    </Panel>
  </main>
</template>
<script>
import Methods from "@/api/methods";
export default {
  data() {
    return {
      user: {
        name: "",
        iconUrl: "",
      },
      username: "mcgardman",
      account: "",
      id: "",
      searchWords: ["…", "。。", "、、", "・・", "明日"],
      allTweets: [],
    };
  },
  methods: {
    test() {},
    async main() {
      let response = await this.getTwitterId();
      this.user.name = response.data.name;
      this.user.iconUrl = response.data.profile_image_url;
      this.id = response.data.id;
      response = await this.getTweets();
      this.allTweets = response.data;
    },
    // APIでアカウント名からアカウント情報を取得するメソッド
    async getTwitterId() {
      return await Methods.getTwitterId(this.username);
    },
    // APIでツイートを取得するメソッド
    async getTweets() {
      return await Methods.getTweets(this.id);
    },
    // 正規表現でマッチした回数を数えるメソッド
    countReg(text, reg) {
      return (text.match(new RegExp(reg, "g")) || []).length;
    },
  },
  computed: {
    counts() {
      let counts = {};
      this.searchWords.forEach((element, index) => {
        counts[element] = 0;
      });
      this.allTweets.forEach((tweet, index) => {
        this.searchWords.forEach((element, index) => {
          counts[element] += this.countReg(tweet.text, element);
        });
      });
      return counts;
    },
  },
};
</script>

