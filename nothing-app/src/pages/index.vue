<script lang="ts" setup>
//
import { computed, reactive } from "vue";

const headers = computed(() => [
  {
    title: "username",
    value: "username",
    searchable: true,
  },
  {
    title: "email",
    value: "email",
    searchable: false,
  },
  {
    title: "location",
    value: "location.name",
    searchable: true,
  },
]);
const items = reactive([
  {
    username: "name",
    email: "name@email.com",
    location: {
      id: "1",
      name: "location",
    },
  },
  {
    username: "name2",
    email: "name2@email.com",
    location: {
      id: "2",
      name: "location2",
    },
  },
]);
</script>

<template>
  <v-container class="mx-auto">
    <base-data-table
      :headers="headers"
      :items="items"
      title="Users"
      subtitle="use this page to view users"
    >
    </base-data-table>
  </v-container>
</template>
