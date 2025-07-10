<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import type User from "@/types/User";
import { useField, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import * as yup from "yup";

// Fetch user data from composable
const { users, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
const dialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const selectedUser = ref<User | null>(null);
const isEditing = ref<boolean>(false);

const toast = ref({ show: false, message: "", color: "success" });

const toastMessages = (name: string, action: string) => {
  return {
    success: `${name} ${action} successfully!`,
    error: `Failed to ${action} ${name}.`,
  };
};

const showToast = (message: string, color = "success") => {
  toast.value = { show: true, message, color };
};

onMounted(fetchUsers);

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: yup.string().required("Username is required"),
});

// Initialize VeeValidate form
const { handleSubmit, resetForm } = useForm<User>({ validationSchema: schema });
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: username, errorMessage: usernameError } =
  useField<string>("username");

// Open dialog for adding a new user
const openAddDialog = () => {
  selectedUser.value = { id: 0, name: "", username: "" };
  isEditing.value = false;
  resetForm();
  dialog.value = true;
};

// Open dialog for editing a user
const openEditDialog = (user: User) => {
  selectedUser.value = { ...user };
  isEditing.value = true;
  resetForm({ values: { name: user.name, username: user.username } });
  dialog.value = true;
};

// Save user (create or update) with validation
const saveUser = handleSubmit((values) => {
  if (isEditing.value && selectedUser.value) {
    updateUser(selectedUser.value.id, values);
    showToast(toastMessages(values.name, "updated").success);
  } else {
    createUser(values);
    showToast(toastMessages(values.name, "added").success);
  }
  dialog.value = false;
});

// Open delete confirmation dialog
const confirmDelete = (user: User) => {
  selectedUser.value = user;
  deleteDialog.value = true;
};

// Delete user
const removeUser = () => {
  if (selectedUser.value) {
    deleteUser(selectedUser.value.id);
    showToast(
      toastMessages(selectedUser.value.name, "deleted").success,
      "error"
    );
    deleteDialog.value = false;
  }
};

const headers = ref([
  { title: "Name", key: "name" },
  { title: "Username", key: "username" },
  { title: "Actions", key: "actions", sortable: false },
]);

const userList = ref({
  title: "User List",
  subtitle: "This is a list of users in the system.",
  // icon: "$users",
  prependIcon: "$users",
  // props: {
  // },
});
</script>

<template>
  <div>
    <v-card v-bind="userList">
      <template #append>
        <v-btn color="primary" @click="openAddDialog" icon="$plus"></v-btn>
      </template>
      <v-data-table
        :headers="headers"
        :items="users"
        item-value="id"
        class="rounded-0"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn icon="$edit" variant="text" @click="openEditDialog(item)" />
          <v-btn icon="$delete" variant="text" @click="confirmDelete(item)" />
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit User Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card
        :title="isEditing ? 'Edit User' : 'Add User'"
        :subtitle="`Use the following form to ${
          isEditing ? 'edit' : 'add'
        } a user.`"
        prepend-icon="$user"
      >
        <template #append>
          <v-btn icon="$close" variant="text" @click="dialog = false"> </v-btn>
        </template>
        <v-card-text>
          <v-form @submit.prevent="saveUser">
            <v-text-field
              v-model="name"
              label="Name"
              variant="outlined"
              :error-messages="nameError"
            />
            <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              :error-messages="usernameError"
            />
            <v-card-actions class="ma-0 pa-0">
              <v-spacer></v-spacer>
              <v-btn color="grey" @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" variant="elevated" type="submit"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          {{ selectedUser?.name }}?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" variant="elevated" @click="removeUser"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="toast.show" :color="toast.color" timeout="3000">
      {{ toast.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="toast.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<!-- <style scoped>
.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
</style> -->
