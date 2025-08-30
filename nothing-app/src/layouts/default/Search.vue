<script lang="ts" setup>
import useEventBus from "@/composables/useEventBus";
import useLocalStorage, { STORAGE_KEYS } from "@/composables/useLocalStorage";
import {
  computed,
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

interface SearchProps {
  query?: string;
  tags?: string[];
}
const props = withDefaults(defineProps<SearchProps>(), {
  query: "",
  tags: () => [],
});

const search = reactive({
  position: {
    x: 300,
    y: 120,
  },
  offset: {
    x: 0,
    y: 0,
  },
  dragging: false,
  query: props.query,
});

function getClientPoint(e: MouseEvent | TouchEvent) {
  if ("touches" in e) {
    const t = e.touches?.[0] ?? e.changedTouches?.[0];
    return { x: t?.clientX ?? 0, y: t?.clientY ?? 0 };
  }
  return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
}

function grabStart(event: MouseEvent | TouchEvent) {
  event.preventDefault();
  search.dragging = true;

  const { y: clientY } = getClientPoint(event);
  search.offset.y = clientY - search.position.y;
}

function grabMove(event: MouseEvent | TouchEvent) {
  if (!search.dragging) return;

  const { x: clientX, y: clientY } = getClientPoint(event);
  search.position.x = clientX - search.offset.x;
  search.position.y = clientY - search.offset.y;
}

function grabEnd() {
  console.log("grabbing");
  if (!search.dragging) return;
  search.dragging = false;
  // save position
  local.setItem(STORAGE_KEYS.toolbarPosition, search.position);
}

// watch(
//   () => search.query,
//   (val: string, old: string) => {
//     if (val !== old) bus.emit(EVENT_KEYS.setSearch, val);
//   }
// );
watch(
  () => props.query,
  (val) => {
    if (val !== search.query) search.query = val ?? "";
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
    <v-chip-group v-if="props.tags">
      <v-chip v-for="(tag, index) in props.tags" :key="index">
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <v-text-field
      v-model="search.query"
      density="compact"
      placeholder="Search"
      prepend-inner-icon="$search"
      variant="solo"
      width="200"
      :loading="loading"
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
        aria-label="drag to move search"
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
