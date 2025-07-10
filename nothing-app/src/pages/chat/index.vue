<script lang="ts" setup>
import useAvatars from "@/composables/useAvatars";
import { useChats } from "@/composables/useChats";
import { newChat } from "@/types/Chat";
import { Room } from "@/types/Room";
import { newUser } from "@/types/User";
import { computed, onMounted, Ref, ref } from "vue";

const pendingChanges = ref(0);
const loading = computed(() => pendingChanges.value > 0);

const { items, sendChat, fetchChats } = useChats();
const { generateAvatar } = useAvatars();

// TODO get from server (/users)
const currentUser = ref(newUser(1, "tom", "spookyowl"));
const currentMessage = ref("");

const sendMessage = () => {
  const message = newChat(currentMessage.value, currentUser.value.id);

  pendingChanges.value++;

  setTimeout(() => {
    sendChat(message);
    pendingChanges.value--;
  }, 420);

  currentMessage.value = "";
};

const chatItems = computed(() =>
  items.value.map((item) => ({
    ...item,
    prependAvatar: generateAvatar(item.subtitle),
  }))
);
const room: Ref<Room | undefined> = ref(undefined);

const roomCard = computed(() => ({
  title: "Rooms",
  //describe chat briefly in a subtitle
  subtitle: "hangout with like-minded souls",
  prependIcon: "$room",
  loading: loading.value,
}));

const chatCard = computed(() => ({
  title: room.value?.title,
  //describe chat briefly in a subtitle
  subtitle: room.value?.subtitle,
  prependIcon: "$chat",
  loading: loading.value,
}));

// TODO: these would come from socket as ROOMS
const rooms = ref([
  {
    key: "walking",
    title: "walking club",
    subtitle: "a club for talking about walking",
    icon: "$walking",
  } as Room,
  {
    key: "volleyball",
    title: "volleyball club",
    subtitle: "a club for talking/playing volleyball",
    icon: "$volleyball",
  } as Room,
]);

// actions
const backToRooms = () => (room.value = undefined);
const chooseRoom = (roomKey: string) => {
  console.log("choosing room: ", roomKey);

  const potentialRoom = rooms.value.find((room) => room.key === roomKey);

  if (potentialRoom) room.value = potentialRoom;
};
const connect = () => {
  console.log("connect");

  chooseRoom("walking");
};
// mounted/lifecycle hooks
onMounted(() => {
  fetchChats();
});
</script>
<template>
  <v-card v-if="!room" v-bind="roomCard">
    <template #append>
      <div>
        <v-btn icon="$connect" variant="text" @click="connect"></v-btn>
        <v-btn icon="$plus" variant="tonal" class="bg-primary"></v-btn>
        <!-- <v-btn icon="$disconnect" variant="text"></v-btn> -->
      </div>
    </template>
    <v-list lines="three" :items="rooms" item-props>
      <template #prepend="{ item }">
        <v-avatar :icon="`$${item.key}`"> </v-avatar>
      </template>
      <template #append="{ item }">
        <v-btn
          variant="text"
          icon="$arrowRight"
          @click="chooseRoom(item.key)"
        ></v-btn>
      </template>
    </v-list>
  </v-card>
  <v-card v-else v-bind="chatCard">
    <template #prepend>
      <v-btn icon="$arrowLeft" variant="text" @click="backToRooms"></v-btn>
    </template>

    <v-list :items="chatItems" item-props></v-list>

    <v-card-actions class="border-t">
      <form @submit.prevent="sendMessage" class="d-flex flex-fill">
        <div class="d-flex flex-fill align-center">
          <v-text-field
            v-model="currentMessage"
            placeholder="what do you want to say?"
            variant="outlined"
            hide-details
          ></v-text-field>
          <v-btn
            icon="$send"
            @click="sendMessage"
            class="d-flex align-center bg-primary elevation-2 ml-2"
          ></v-btn>
        </div>
      </form>
    </v-card-actions>
  </v-card>
</template>
<style scoped></style>
