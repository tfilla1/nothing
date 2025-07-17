<template>
  <v-app-bar class="bg-primary">
    <v-app-bar-title>
      <v-btn
        icon="$nothing"
        @click="showMenu = !showMenu"
        variant="text"
      ></v-btn>

      nothing
    </v-app-bar-title>
    <v-btn
      v-for="{ name, meta } in routes"
      :key="name"
      :icon="meta.icon"
      @click="() => router.push({ name })"
    ></v-btn>
    <v-divider vertical></v-divider>
    <light-switch></light-switch>
    <v-btn icon="$github" @click="gotoGithub"></v-btn>
  </v-app-bar>

  <Menu v-model="showMenu"></Menu>
</template>

<script lang="ts" setup>
//
import LightSwitch from "@/components/light-switch.vue";
import Menu from "@/layouts/default/Menu.vue";
import { ref } from "vue";
import { RouteRecordNormalized, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const routes = router
  .getRoutes()
  .filter((route: RouteRecordNormalized) => route.meta.nav === true);

const gotoGithub = () => {
  window.open("https://github.com/tfilla1/nothing/tree/main");
};

const showMenu = ref(false);
</script>
