<script lang="ts" setup>
import { computed, ref, reactive, useSlots, watch, onMounted } from "vue";

const slots = useSlots();

export interface CardDrawerProps {
  actionStyles?: string;
  cardTextClass?: string;
  classes?: string;
  closeText?: string;
  color?: string;
  disabled?: boolean;
  elevation?: number;
  errorMessages?: string | string[];
  hasActions?: boolean;
  hint?: string;
  label?: string;
  maxValue?: string;
  minValue?: string;
  persistentHint?: boolean;
  variant?: "outlined" | "filled";
  title?: string;
  modelValue?: boolean;
  width?: string;
  toolbarHeight?: number | string | undefined;
}

const innerShowCard = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value),
});

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean | null): void;
}>();
const props = withDefaults(defineProps<CardDrawerProps>(), {
  variant: "outlined",
  actionStyles: "",
  cardTextClass: "overflow-auto v-card__text",
  closeText: "Close",
  elevation: 1,
  width: "300px",
  toolbarHeight: 75,
});

const cancel = () => {
  innerShowCard.value = false;
};

const hasHeaderSlot = computed(() => !!slots.header);

const wrapper = ref(null);
</script>

<style>
.base-card-drawer {
  transition: width 200ms ease-in-out;
}
</style>

<template>
  <div
    ref="wrapper"
    :elevation="elevation"
    height="inherit"
    :style="`width: ${innerShowCard ? width : 0}`"
    variant="flat"
    rounded="0"
    class="base-card-drawer d-flex flex-shrink-0 flex-grow-0 overflow-y-auto overflow-x-hidden"
    style="z-index: 1"
  >
    <v-divider vertical style="min-width: 2px !important"></v-divider>
    <div
      :style="`width: ${width}`"
      class="d-flex flex-column flex-shrink-0 flex-grow-0"
    >
      <slot name="header" v-bind="{ close: cancel }">
        <v-toolbar
          v-if="hasHeaderSlot || title !== ''"
          flat
          class="flex-grow-0 flex-shrink-0"
          :height="toolbarHeight"
        >
          <div class="text-h5 flex-fill text-no-wrap ml-4">{{ title }}</div>
          <v-tooltip
            location="bottom"
            max-width="250px"
            content-class="no-opacity"
            open-delay="250"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                icon="$close"
                class="justify-right"
                v-bind="props"
                @click="cancel"
              >
              </v-btn>
            </template>
            <span>{{ closeText }}</span>
          </v-tooltip>
        </v-toolbar>
        <v-divider></v-divider>
      </slot>
      <div
        class="d-flex flex-column flex-grow-1 flex-shrink-1"
        :class="[cardTextClass]"
      >
        <slot></slot>
      </div>
      <v-divider v-if="hasActions" style="margin-bottom: 1.5px"></v-divider>
      <v-card-actions v-if="hasActions" :style="actionStyles">
        <slot name="footer"></slot>
      </v-card-actions>
    </div>
  </div>
</template>
