<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Menubar from "primevue/menubar";
</script>

<template>
  <header>
    <Menubar :model="items" class="p-menubar mb-3" />
  </header>
  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Twitter解析",
          icon: "pi pi-fw pi-twitter",
        },
      ],
    };
  },
};
</script>

