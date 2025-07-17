import User from "@/types/User";
import { ref } from "vue";

export function useUsers() {
  const users = ref<User[]>([]);
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  // Make the API URL configurable via VITE_API_URL, fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3421/users";

  // Fetch all users
  const fetchUsers = async (): Promise<User[] | undefined> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      users.value = await response.json();
      return users.value
    } catch (err) {
      error.value = (err as Error).message;
      return undefined
    }
  };

  // Fetch a single user by ID
  const fetchUserById = async (id: number): Promise<User | undefined> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("User not found");
      user.value = await response.json() as User;
      return user.value
    } catch (err) {
      error.value = (err as Error).message;
      return undefined
    }
  };

  // Create a new user
  const createUser = async (newUser: Omit<User, "id">): Promise<void> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const createdUser: User = await response.json();
      users.value.push(createdUser);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // Update a user by ID
  const updateUser = async (id: number, updatedUser: Omit<User, "id">): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      // …after awaiting the fetch response…
      const updated: User = await response.json();
      users.value = users.value.map((u) =>
        u.id === id ? updated : u
      );
      users.value = users.value.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // Delete a user by ID
  const deleteUser = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      users.value = users.value.filter((u) => u.id !== id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  return {
    users,
    user,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
