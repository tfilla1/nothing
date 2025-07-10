<script setup lang="ts">
import { computed } from "vue";
interface dialogProps {
  modelValue: boolean; // toggle dialog
  title?: string;
  subtitle?: string;
  loading: boolean;
}

const emits = defineEmits<{
  (e: "update:modelValue", value?: boolean): void;
  (e: "update:save", value?: string): void;
}>();
const props = defineProps<dialogProps>();

const innerShowDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value),
});

const close = () => {
  emits("update:modelValue", false);
};
</script>

<template>
  <v-dialog v-model="innerShowDialog" max-width="420">
    <v-card
      :title="title"
      :subtitle="subtitle !== '' ? subtitle : undefined"
      :loading="loading"
    >
      <template #append>
        <v-btn icon="$close" @click="close" variant="text"></v-btn>
      </template>
      <slot name="default">
        <v-card-text>
          Welcome to the dialog, this is a place that will sometimes be filled
          with content or pictures or some other things. Feel free to hang here
          for as long as you wants.
        </v-card-text>
      </slot>
    </v-card>
  </v-dialog>
</template>
