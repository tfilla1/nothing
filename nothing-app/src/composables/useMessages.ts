import { ref } from 'vue';

export default function useMessages() {
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


  return {
    toastMessages,
    showToast
  }
}
