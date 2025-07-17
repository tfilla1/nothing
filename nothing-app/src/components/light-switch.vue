<script lang="ts" setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDark = computed(() => theme.current.value.dark);

const toggleTheme = () =>
  theme.change(theme.current.value.dark ? "light" : "dark");
</script>

<template>
  <v-btn @click="toggleTheme" :icon="isDark ? '$dark' : '$light'"></v-btn>
</template>
