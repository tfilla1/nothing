<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { DataTableHeader, dataTableProps } from "@/classes/dataTableProps";

// emit an edit event, if undefined >> add
const emits = defineEmits<{
  (e: "applyFilters"): void;
  (e: "resetFilters"): void;
  (e: "edit", value?: string): void;
  (e: "delete", value: string): void;
  (e: "update:modelValue", value?: string): void;
  (e: "update:searchBy", value?: string): void;
}>();
const props = defineProps<dataTableProps>();
const slots = useSlots();

const innerSearch = computed({
  get: () => props.modelValue,
  set: (value: string) => emits("update:modelValue", value),
});
const innerSearchBy = computed({
  get: () => props.searchBy ?? "",
  set: (value: string) => emits("update:searchBy", value),
});

const deleteItem = (item: string) => {
  emits("delete", item);
};
const editItem = (item?: string) => {
  emits("edit", item);
};

const showSettings = ref(false);
const showFilters = ref(false);
const hasFilterSlot = computed(() => !!slots.filters);

const applyFilters = () => {
  emits("applyFilters");
};
const resetFilters = () => {
  emits("resetFilters");
};
const toggleFilters = () => {
  if (showSettings.value === true) toggleSettings();
  showFilters.value = !showFilters.value;
};
const toggleSettings = () => {
  if (showFilters.value === true) toggleFilters();

  showSettings.value = !showSettings.value;
};
const toggleColumns = (item: DataTableHeader) => {
  item.checked = !item.checked;
};
</script>

<template>
  <v-sheet class="d-flex flex-fill overflow-hidden">
    <div class="d-flex flex-grow-1 flex-column overflow-hidden">
      <v-data-table
        :headers="headers.filter((h) => h.checked === true)"
        :items="items"
        :loading="loading"
        :sort-by="sortBy"
        :search="innerSearch"
        class="elevation-1 fill-height"
      >
        <template v-if="showToolbar" #top>
          <div class="d-flex flex-grow-0 align-center">
            <v-card-item
              :prepend-icon="icon"
              :title="title"
              :subtitle="subtitle"
              class="flex-fill"
            ></v-card-item>
            <div class="d-flex">
              <v-text-field
                v-model="innerSearch"
                label="Search"
                prepend-inner-icon="$search"
                variant="filled"
                hide-details
                style="min-width: 300px"
                :rounded="hasSearchBy ? 'e-0' : undefined"
              ></v-text-field>
              <template v-if="hasSearchBy">
                <v-divider vertical></v-divider>
                <v-select
                  v-model="innerSearchBy"
                  label="Search By"
                  :items="props.headers.filter((h) => h.searchable)"
                  variant="filled"
                  hide-details
                  style="min-width: 150px"
                  rounded="s-0"
                ></v-select>
              </template>
              <v-tooltip
                v-if="hasFilterSlot"
                location="bottom"
                max-width="250px"
                content-class="no-opacity"
                open-delay="250"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="text-none black--text mx-2 pa-0"
                    v-bind="props"
                    :variant="showFilters ? 'tonal' : undefined"
                    @click="toggleFilters()"
                    icon
                    elevation="0"
                  >
                    <v-badge
                      v-if="totalFilters > 0"
                      :content="totalFilters"
                      :color="`${submittedFilters ? 'primary' : 'error'}`"
                      :offset-x="-4"
                      :offset-y="-4"
                    >
                      <v-icon>$filter</v-icon>
                    </v-badge>
                    <v-icon v-else>$filter</v-icon>
                  </v-btn>
                </template>
                <span>Show/Hide Filter Menu</span>
                <br />
                <span
                  class="text-caption"
                  v-if="totalFilters > 0 && !submittedFilters"
                >
                  {{ totalFilters }} filter(s) waiting to be applied
                </span>
                <span
                  class="text-caption"
                  v-else-if="totalFilters > 0 && submittedFilters"
                >
                  {{ totalFilters }} filter(s) applied
                </span>
              </v-tooltip>
              <v-tooltip
                location="bottom"
                max-width="250px"
                content-class="no-opacity"
                open-delay="250"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon
                    class="mx-1"
                    :variant="showSettings ? 'tonal' : undefined"
                    elevation="0"
                    v-bind="props"
                    @click="toggleSettings"
                  >
                    <v-icon>$settings</v-icon>
                  </v-btn>
                </template>
                <span>Table Settings</span>
              </v-tooltip>
              <v-tooltip
                v-if="hasCreate"
                location="bottom"
                max-width="250px"
                content-class="no-opacity"
                open-delay="250"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="elevated"
                    icon="$plus"
                    class="mx-1 bg-primary"
                    v-bind="props"
                    @click="editItem"
                  >
                  </v-btn>
                </template>
                <span>Create Item</span>
              </v-tooltip>
            </div>
          </div>
          <v-divider></v-divider>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn variant="text" icon="$edit" @click="editItem(item.id)"></v-btn>
          <v-btn
            variant="text"
            icon="$delete"
            @click="deleteItem(item.id)"
          ></v-btn>
        </template>
      </v-data-table>
    </div>

    <base-card-drawer
      v-model="showFilters"
      title="Filters"
      close-text="Hide Filter Menu"
      has-actions
      :loading="loading"
    >
      <slot name="filters"></slot>
      <template v-slot:footer>
        <slot name="filterActions">
          <v-spacer />
          <v-btn variant="text" color="primary" @click="resetFilters">
            Clear
          </v-btn>
          <v-btn variant="elevated" color="primary" @click="applyFilters">
            Apply
          </v-btn>
        </slot>
      </template>
    </base-card-drawer>

    <base-card-drawer
      v-model="showSettings"
      close-text="Hide Table Settings"
      title="Table Settings"
    >
      <v-list>
        <v-list-subheader>Visible Columns</v-list-subheader>
        <v-list-item
          v-for="(item, index) in props.headers.filter(
            (h) => h.toggleable === true
          )"
          :key="index"
          @click="toggleColumns(item)"
          :title="item.title"
          color="primary"
          :prepend-icon="item.checked ? '$checked' : '$unchecked'"
        >
        </v-list-item>
      </v-list>
    </base-card-drawer>
  </v-sheet>
</template>
