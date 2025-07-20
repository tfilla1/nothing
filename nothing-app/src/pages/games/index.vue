<script lang="ts" setup>
import useEventBus, { EVENT_KEYS } from "@/composables/useEventBus";
import useFloatingSearch from "@/composables/useFloatingSearch";
import { computed, onBeforeUnmount, onMounted, Ref, ref } from "vue";
import game from "./game.vue";

interface CardType {
  modelValue: any;
  title: string;
  subtitle: string;
  prependIcon: string;
  props?: any;
}
interface GameType extends CardType {}

// const games = ref(["brickbreaker", "eights", "war", "etc"]);

interface ThingType {
  modelValue: string;
  title: string;
  prependIcon: string;
  props: any;
}

const { hide, show } = useFloatingSearch();

const selectedGame: Ref<ThingType | undefined> = ref(undefined);
const search = ref("");
const gameList = computed(() =>
  [
    {
      modelValue: "brickbreaker",
      title: "brickbreaker",
      prependIcon: "$arrowLeft",
      // onClick: () => (selectedGame.value = undefined),
      props: {
        appendIcon: "$arrowRight",
        onClick: (): any =>
          (selectedGame.value = gameList.value.find(
            (game) => game.modelValue === "brickbreaker"
          )),
      },
    },
    {
      modelValue: "eights",
      title: "eights",
      prependIcon: "$arrowLeft",
      // onClick: () => (selectedGame.value = undefined),
      props: {
        appendIcon: "$arrowRight",
        onClick: (): any =>
          (selectedGame.value = gameList.value.find(
            (game) => game.modelValue === "eights"
          )),
      },
    },
  ].filter((game) => game.modelValue.includes(search.value))
);

const gameCard: Ref<GameType> = ref({
  title: "welcome to games",
  subtitle: "here are some games",
  prependIcon: "$games",
  modelValue: "welcome",
});

const bus = useEventBus();
const handler = (query: string) => {
  console.log({ query });
  search.value = query;
};

onMounted(() => {
  show();
  bus.on(EVENT_KEYS.setSearch, handler);
});
onBeforeUnmount(() => {
  hide();
  bus.off(EVENT_KEYS.setSearch, handler);
});
</script>
<template>
  <v-card v-if="!selectedGame" v-bind="gameCard">
    <v-list :items="gameList"></v-list>
  </v-card>

  <v-card v-else v-bind="selectedGame">
    <template #prepend>
      <v-btn
        :icon="selectedGame.prependIcon"
        @click="selectedGame = undefined"
        variant="text"
      ></v-btn>
    </template>
    <Suspense>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <game v-bind="selectedGame"></game>
      </div>
      <template #fallback>
        <v-progress-circular indeterminate></v-progress-circular>
      </template>
    </Suspense>
  </v-card>
</template>
<style scoped></style>
