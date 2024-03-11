<script lang="ts" setup>
/**
 * create a base data table component
 * with search capabilities from a server
 * and drawers for settings
 * and filters
 * ability to add/edit records
 */

import { ref, computed, reactive } from "vue";

const props = defineProps<{
  headers: any[];
  items: any[];
  title: string;
  subtitle: string;
}>();

const search = ref("");
const searchBy = ref("username");

const showEdit = ref(false);
const showFilters = ref(false);
const showSettings = ref(false);

const toggleEdit = () => {
  showEdit.value = !showEdit.value;
};
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};
</script>

<template>
  <v-card :title="title" :subtitle="subtitle">
    <template #append>
      <v-btn variant="text" icon="mdi-cog" @click="toggleSettings"></v-btn>
      <v-btn variant="text" icon="mdi-filter" @click="toggleFilters"></v-btn>
      <v-btn
        variant="elevated"
        class="bg-primary"
        icon="mdi-plus"
        @click="toggleEdit"
      ></v-btn>
    </template>
    <template #text>
      <div class="d-flex align-center">
        <div class="d-flex flex-grow-1">
          <v-text-field
            v-model="search"
            variant="outlined"
            label="search"
            prepend-inner-icon="mdi-magnify"
            class="border-r-2"
          >
          </v-text-field>
        </div>
        <div class="d-flex flex-shrink-1">
          <v-select
            v-model="searchBy"
            label="search by"
            :items="headers.filter((h) => h.searchable)"
            variant="outlined"
          ></v-select>
        </div>
      </div>
    </template>
    <slot name="table">
      <v-data-table :headers="headers" :items="items" :search="search">
      </v-data-table>
    </slot>
  </v-card>

  <v-dialog v-model="showEdit" max-width="420">
    <v-card title="edit">
      <template #append>
        <v-btn @click="toggleEdit" icon="mdi-close" variant="text"></v-btn>
      </template>
      <template #text> asdf </template>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showSettings" max-width="420">
    <v-card title="settings">
      <template #append>
        <v-btn @click="toggleSettings" icon="mdi-close" variant="text"></v-btn>
      </template>
      <template #text> asdf </template>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showFilters" max-width="420">
    <v-card title="filters">
      <template #append>
        <v-btn @click="toggleFilters" icon="mdi-close" variant="text"></v-btn>
      </template>
      <template #text> asdf </template>
    </v-card>
  </v-dialog>
</template>
