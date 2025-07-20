<script lang="ts" setup>
import useEventBus, { EVENT_KEYS } from "@/composables/useEventBus";
import useLocalStorage, { STORAGE_KEYS } from "@/composables/useLocalStorage";
import {
  computed,
  ComputedRef,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

const bus = useEventBus();
const local = useLocalStorage();

const pendingChanges = ref(0);
const loading = computed(() => pendingChanges.value > 0);
interface CardType {
  title: string;
  subtitle: string;
  icon: string;
  modelValue: boolean;
  loading: boolean;
}
interface SearchType extends CardType {}
const searchCard: ComputedRef<SearchType> = computed(
  () =>
    ({
      loading: loading.value,
      title: "Search",
      subtitle: "have a search or a gander",
      modelValue: true,
    } as SearchType)
);

const search = reactive({
  position: {
    x: 300,
    y: 300,
  },
  offset: {
    x: 0,
    y: 0,
  },
  dragging: false,
  query: "",
});

function grabStart(event: any) {
  event.preventDefault();
  search.dragging = true;

  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;
  search.offset.x = clientX - search.position.x;
  search.offset.y = clientY - search.position.y;
}

function grabMove(event: MouseEvent | TouchEvent) {
  if (!search.dragging) return;
  const clientX =
    "clientX" in event ? event.clientX : event.touches[0].clientX ?? 0;
  const clientY =
    "clientY" in event ? event.clientY : event.touches[0].clientY ?? 0;
  search.position.x = clientX - search.offset.x;
  search.position.y = clientY - search.offset.y;
}

function grabEnd() {
  if (!search.dragging) return;
  search.dragging = false;
  // save position
  local.setItem(STORAGE_KEYS.toolbarPosition, search.position);
}

watch(
  () => search.query,
  (val: string, old: string) => {
    if (val !== old) bus.emit(EVENT_KEYS.setSearch, val);
  }
);

onMounted(() => {
  // restore last position if saved
  const saved = local.getItem(STORAGE_KEYS.toolbarPosition);
  if (saved) {
    Object.assign(search.position, saved);
  }

  // move and end listeners on window
  window.addEventListener("mousemove", grabMove);
  window.addEventListener("mouseup", grabEnd);
  window.addEventListener("touchmove", grabMove);
  window.addEventListener("touchend", grabEnd);
});

onBeforeUnmount(() => {
  // clean up listeners
  window.removeEventListener("mousemove", grabMove);
  window.removeEventListener("mouseup", grabEnd);
  window.removeEventListener("touchmove", grabMove);
  window.removeEventListener("touchend", grabEnd);
});
</script>
<template>
  <v-toolbar
    rounded="lg"
    density="compact"
    absolute
    border
    floating
    :style="{
      top: `${search.position.y}px`,
      left: `${search.position.x}px`,
      zIndex: 1000,
    }"
  >
    <v-text-field
      v-model="search.query"
      density="compact"
      placeholder="Search"
      prepend-inner-icon="$search"
      variant="solo"
      width="200"
      flat
      hide-details
      single-line
    ></v-text-field>

    <template v-slot:append>
      <v-btn
        class="ms-1"
        :class="{
          moving: search.dragging,
          move: !search.dragging,
        }"
        density="comfortable"
        icon="$grabber"
        @mousedown="grabStart"
        @touchstart="grabStart"
      ></v-btn>
    </template>
  </v-toolbar>
</template>
<style scoped>
.move {
  cursor: grab;
}
.moving {
  cursor: grabbing;
}
</style>
