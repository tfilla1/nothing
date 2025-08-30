<script lang="ts" setup>
import { GameItem } from "@/composables/useGames";
defineOptions({ name: "SearchWithChips" });
// Search with chips

type ItemAction = { label: string; onClick: () => void };
interface Item {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  actions: ItemAction[];
  props: Record<string, unknown>;
}
interface SearchWithChipsProps {
  items: GameItem[];
}
const props = defineProps<SearchWithChipsProps>();
</script>
<template>
  <div>
    <v-card v-for="(item, index) in items" v-bind="item" :key="index">
      <template #append>asdf</template>
    </v-card>
  </div>
</template>
<style scoped></style>
