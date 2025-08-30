<template>
  <v-main class="bg-background">
    <v-container>
      <v-row class="mt-4">
        <v-col cols="12">
          <router-view />
        </v-col>
      </v-row>
      <Search />
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import Search from "./Search.vue";
</script>
