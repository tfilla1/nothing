<template>
  <v-app class="bg-grey-lighten-2">
    <DefaultBar />

    <DefaultView />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./default/AppBar.vue";
import DefaultView from "./default/View.vue";
</script>
