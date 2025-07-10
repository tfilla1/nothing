<script lang="ts" setup>
//
import { computed, ref } from "vue";
import { users } from "../assets/data/users";

const headers = computed(() => [
  {
    title: "username",
    value: "username",
    searchable: true,
    toggleable: true,
    checked: true,
  },
  {
    title: "email",
    value: "email",
    searchable: false,
    toggleable: true,
    checked: true,
  },
  {
    title: "location",
    value: "location.name",
    searchable: true,
    toggleable: true,
    checked: true,
  },
]);
const items = computed(() => users);

const search = ref("");
const totalFilters = ref(0);
</script>

<template>
  <v-container class="mx-auto">
    <base-data-table
      :headers="headers"
      :items="items"
      v-model="search"
      :total-filters="totalFilters"
      :show-toolbar="true"
      :has-search="true"
      title="Users"
      icon="$users"
      subtitle="use this page to view users"
    >
      <template #filters>
        <div>hello</div>
      </template>
    </base-data-table>
  </v-container>
</template>
