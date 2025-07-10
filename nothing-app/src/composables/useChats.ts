import Chat from "@/types/Chat";
import { Item } from "@/types/Item";
import { ref } from "vue";
import { useUsers } from "./useUsers";



export function useChats() {
  const items = ref<Item[]>([]);
  const item = ref<Chat | null>(null);
  const error = ref<string | null>(null);
  const API_URL = "http://localhost:3421/chats"; // Adjust if needed

  // Fetch all users
  const fetchChats = async (): Promise<void> => {
    try {
      const response = await fetch(API_URL);
      console.log({ response })
      if (!response.ok) throw new Error("Failed to fetch chats");
      // items.value = [
      //   newChat('hey', newUser(1, 'tom', 'spookyowl').id),
      //   newChat('hey there', newUser(2, 'you', 'otheruser').id),
      //   newChat('what is going on???', newUser(1, 'tom', 'spookyowl').id),
      // ].map((item: Item) => ({
      //   title: item.text,
      //   subtitle: (useUsers().fetchUserById(item.userId))?.username ?? '--',
      // }));
      const serverItems = await response.json() as Chat[];

      console.log({ serverItems })
      items.value = serverItems.map(item => ({
        title: item.text,
        subtitle: item.user.username
      }))

      console.log({ v: items.value })
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // send chat
  const sendChat = async (newChat: Omit<Chat, "id">): Promise<void> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChat),
      });
      if (!response.ok) throw new Error("Failed to send chat");
      const createdChat: Chat = await response.json();

      console.log({ createdChat })
      const users = await useUsers().fetchUsers()
      items.value.push({
        title: createdChat.text,
        subtitle: users?.find(u => u.id === createdChat.userId)?.username ?? '--',
      });
    } catch (err) {
      error.value = (err as Error).message;
    }
  };


  return {
    items,
    item,
    error,
    fetchChats,
    sendChat,
  };
}
