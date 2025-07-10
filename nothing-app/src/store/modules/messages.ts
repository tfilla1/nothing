import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => ({
    toast: { show: false, message: "", color: "success" },
  }),
  actions: {
    toastMessages(name: string, action: string) {
      return {
        success: `${name} ${action} successfully!`,
        error: `Failed to ${action} ${name}.`,
      };
    },
    showToast(message: string, color = "success") {
      this.toast = { show: true, message, color };
    },
  },
});
