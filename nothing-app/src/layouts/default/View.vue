<template>
  <v-main class="bg-background">
    <v-container>
      <v-row><v-col cols="12">&nbsp;</v-col></v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <router-view />
        </v-col>
      </v-row>
      <Search v-if="visible"></Search>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import useFloatingSearch from "@/composables/useFloatingSearch";
import Search from "./Search.vue";

const { visible } = useFloatingSearch();
</script>
