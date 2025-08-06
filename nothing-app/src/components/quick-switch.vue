<script lang="ts" setup>
// quick-switch
// TODO: we need a switcher for 4 favorites

// TODO so use local storage and add favorites

// TODO we can have 3 and a ... but store 8?
// TODO

import useLocalStorage, { STORAGE_KEYS } from "@/composables/useLocalStorage";
import { computed, onMounted, Ref, ref } from "vue";
const pendingChanges = ref(0);
const loading = computed(() => pendingChanges.value > 0);
const local = useLocalStorage();
// interface CardType { title: string; subtitle: string; icon: string }
interface QuickSwitchComponent {
  favorites: QuickSwitchType[];
}
interface QuickSwitchType {
  icon: string;
  title: string;
  onClick: () => void;
}

// const props = defineProps<QuickSwitchComponent>();

const items: Ref<QuickSwitchType[]> = ref([
  {
    icon: "$music",
    title: "Music",
    onClick: () => console.log("go to music"),
  },
  {
    icon: "$chat",
    title: "Chat",
    onClick: () => console.log("go to chat"),
  },
  {
    icon: "$cloud",
    title: "Thoughts",
    onClick: () => console.log("go to notes"),
  },
  {
    icon: "$list",
    title: "Lists",
    onClick: () => console.log("go to lists"),
  },
]);

// function chunkArray(inputArray, chunkSize):
//     result = empty array
//     for i from 0 to length of inputArray, increment by chunkSize:
//         chunk = slice inputArray from i to i + chunkSize
//         append chunk to result
//     return result

const chunkedItems = computed(() => {
  const chunks = [];
  for (let i = 0; i < items.value.length; i += 2) {
    chunks.push(items.value.slice(i, i + 2));
  }
  return chunks;
});

// const showMore = () => [
//   {
//     title: "",
//     description: '',
//     icon: ''
//   },
// ];
onMounted(() => {
  console.log("mounted");

  // TODO search local storage for FAVORITES_KEY

  const stored_favorites = local.getItem(STORAGE_KEYS.favorites);

  // items.value =
  //   stored_favorites && stored_favorites.length ? stored_favorites : [];
  // console.log({ stored_favorites });
});
</script>
<template>
  <v-divider vertical></v-divider>
  <div class="d-flex flex-column flex-end">
    <div
      class="d-flex flex-row mx-4"
      v-for="(items, index) in chunkedItems"
      :key="index"
    >
      <div class="d-flex flex-column" v-for="(i, index) in items" :key="index">
        <v-btn v-bind="i" class="me-4" size="medium" @click="i.onClick"></v-btn>
      </div>
    </div>
    <!-- <div class="d-flex flex-column">
      <v-btn class="me-4" size="medium" icon="$more" @click="showMore"></v-btn>
    </div> -->
  </div>
</template>
<style scoped></style>
