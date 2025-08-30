<script lang="ts" setup>
import SearchWithChips from "@/components/search-with-chips.vue";
import useGames from "@/composables/useGames";
import { computed, onBeforeUnmount, onMounted, Ref, ref } from "vue";
import game from "./game.vue";

interface CardType {
  modelValue: any;
  title: string;
  subtitle: string;
  prependIcon: string;
  // props?: any;
}
// interface GameType extends CardType {}

// const games = ref(["brickbreaker", "eights", "war", "etc"]);

interface ThingType {
  modelValue: string;
  title: string;
  prependIcon: string;
  props: any;
}

// const { hide, show } = useFloatingSearch();
const { chooseGame, getGameList, selectedGame } = useGames();

const pendingChanges = ref(1);
const loading = computed(() => pendingChanges.value > 0);

// const selectedGame: Ref<ThingType | undefined> = ref(undefined);
const search = ref("");

const gameList = computed(() =>
  getGameList().filter((game) => game.modelValue.includes(search.value))
);

const gameCard: Ref<CardType> = ref({
  title: "welcome to games",
  subtitle: "here are some games",
  prependIcon: "$games",
  modelValue: "welcome",
  width: 500,
  height: 500,
});

// const bus = useEventBus();
// const handler = (query: string) => (search.value = query);

onMounted(() => {
  // show();
  // listener for search:query - hand off to searchHandler
  // bus.on(EVENT_KEYS.setSearch, handler);
});
onBeforeUnmount(() => {
  // hide();
  // bus.off(EVENT_KEYS.setSearch, handler);
});
</script>
<template>
  <!-- {{ selectedGame }} -->
  <SearchWithChips :items="gameList" />
  <v-card
    v-if="!selectedGame"
    v-bind="gameCard"
    item-props
    :prepend-icon="gameCard.prependIcon"
  >
    <v-list>
      <v-list-item
        v-for="game in gameList"
        :key="game.modelValue"
        @click="chooseGame(game.modelValue)"
        append-icon="$arrowRight"
      >
        {{ game.title }}
      </v-list-item>
    </v-list>
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
      <div class="d-flex flex-fill">
        <game v-bind="selectedGame"></game>
      </div>
      <template #fallback>
        <v-progress-circular indeterminate></v-progress-circular>
      </template>
    </Suspense>
  </v-card>
</template>
<style scoped></style>
