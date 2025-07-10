<template>
  <v-navigation-drawer
    v-model="innerShowMenu"
    app
    class="bg-background"
    persistent
  >
    <v-list nav>
      <v-list-item
        v-for="(item, index) in routes"
        :key="index"
        :value="item.name"
        :exact="item.meta.exact"
        :prepend-icon="item.meta.icon"
        :to="item"
        :title="item.meta.title()"
        color="secondary"
      >
        <template #prepend>
          <v-icon :icon="item.meta.icon"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
import { RouteRecordNormalized, useRouter } from "vue-router";
const theme = useTheme();
// const drawer = ref(true);
const isDark = computed(() => theme.current.value.dark);
const router = useRouter();
const routes = router
  .getRoutes()
  .filter((route: RouteRecordNormalized) => route.meta.nav === true);

interface menuProps {
  modelValue: boolean; // toggle menu
  title?: string;
  subtitle?: string;
}

const emits = defineEmits<{
  (e: "update:modelValue", value?: boolean): void;
}>();
const props = defineProps<menuProps>();

const innerShowMenu = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value),
});
</script>
