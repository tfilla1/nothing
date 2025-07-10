<script lang="ts" setup>
import { useCategories } from "@/composables/useCategories";
import useTodos, { newTodo, Todo } from "@/composables/useTodos";
import { computed, ref } from "vue";
// import things from "../../assets/data/categories.json";

const pendingStateChanges = ref(0);
const loading = computed(() => pendingStateChanges.value > 0);

const { items: todoList, addTodo, editTodo, removeTodo, setDone } = useTodos();

const items = computed(() =>
  filterDone.value
    ? todoList.value.filter((t) => t.done)
    : todoList.value.filter((t) => !t.done)
);

const showFilterDialog = ref(false);
const toggleFilterDialog = () => {
  showFilterDialog.value = !showFilterDialog.value;
};

const showManageDialog = ref(false);
const close = () => {
  showManageDialog.value = false;
};
const rules = ref([
  (value: any) => {
    if (value) return true;
    return "This field is required.";
  },
]);
const save = () => {
  if (!form.value.isValid) return;

  pendingStateChanges.value++;

  setTimeout(() => {
    if (item.value.id !== undefined) {
      editTodo(item.value.id, item.value);
    } else {
      addTodo(item.value);
    }
    pendingStateChanges.value--;
    close();
  }, 1500);
};

const toggleAdd = () => {
  console.log({ form });
  showManageDialog.value = true;
  const maxId = Math.max(...todoList.value.map((t) => t.id), 0);

  item.value = {
    done: false,
    id: maxId,
    priority: 1,
    task: "",
    category: "home",
  };
};
const toggleEdit = (id: number) => {
  showManageDialog.value = true;
  item.value = todoList.value.find((t) => t.id === id) ?? newTodo(id);
};
const toggleDelete = (id: number) => {
  var remove = confirm(`delete this: ${id}`);

  if (remove) removeTodo(id);
};

const toggleDone = (id: number) => {
  setDone(id);
};

// const items = computed(() => todos);
const categories = computed(() => useCategories().categories.value);
const form = ref({} as any);
const filterDone = ref(false);
// const filter = computed(() => (t: Todo) => filterDone.value ? t.done : true);
const item = ref({} as Todo);
const manageTitle = computed(() =>
  item.value.id !== undefined ? "Edit Todo" : "Add Todo"
);

const pageCard = ref({
  prependIcon: "$todo",
  title: "To Do",
  subtitle: "things to do",
});
</script>

<template>
  <v-container class="mx-auto">
    <v-card v-bind="pageCard">
      <template #append>
        <v-btn
          icon="$filter"
          variant="text"
          @click="toggleFilterDialog"
        ></v-btn>

        <v-btn
          icon="$plus"
          variant="elevated"
          class="bg-primary"
          @click="toggleAdd"
        ></v-btn>
      </template>

      <v-list lines="two" class="border-top">
        <transition-group name="todo-item">
          <v-list-item
            v-for="{ id, task, category, done } in items"
            :key="id"
            :title="task"
            :subtitle="category ? category : undefined"
            class="my-4"
            variant="flat"
            lines="two"
          >
            <template #prepend>
              <v-btn
                :icon="done ? '$checked' : '$unchecked'"
                variant="flat"
                @click="toggleDone(id)"
              ></v-btn>
            </template>
            <template #subtitle="{ subtitle }">
              <div class="d-flex align-center">
                <v-icon size="small"
                  >${{ (subtitle as string)?.toLowerCase() }}</v-icon
                >
                {{ subtitle }}
              </div>
            </template>
            <template #append>
              <v-btn
                icon="$edit"
                variant="flat"
                @click="toggleEdit(id)"
              ></v-btn>
              <v-btn
                icon="$delete"
                variant="flat"
                @click="toggleDelete(id)"
              ></v-btn>
            </template>
          </v-list-item>
        </transition-group>
      </v-list>
    </v-card>
  </v-container>

  <base-dialog
    v-model="showFilterDialog"
    title="filters"
    subtitle="a place to filter things to stuff."
    max-width="420"
    :loading="loading"
  >
    <v-card-text>
      <v-switch v-model="filterDone" label="show done?"></v-switch>
    </v-card-text>
  </base-dialog>

  <base-dialog
    v-model="showManageDialog"
    max-width="420"
    :title="manageTitle"
    :loading="loading"
  >
    <v-form ref="form" @submit.prevent="save">
      <v-card-text>
        <v-text-field
          v-model="item.task"
          class="my-2"
          label="task"
          :rules="rules"
          variant="outlined"
        ></v-text-field>
        <v-select
          v-model="item.priority"
          class="my-2"
          :items="[1, 2, 3]"
          label="priority"
          :rules="rules"
          variant="outlined"
          required
        ></v-select>
        <v-select
          v-model="item.category"
          class="my-2"
          :items="categories"
          label="category"
          :rules="rules"
          variant="outlined"
          required
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">close</v-btn>
        <v-btn type="submit" variant="elevated" class="bg-primary">Save</v-btn>
      </v-card-actions>
    </v-form>
  </base-dialog>
</template>

<style scoped>
.todo-item-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.todo-item-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
</style>
