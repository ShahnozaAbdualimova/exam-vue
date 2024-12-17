import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", {
  state: () => ({
    isModalVisible: false,
    modalType: null,
  }),
  actions: {
    openModal(type) {
      this.isModalVisible = true;
      this.modalType = type;
    },
    closeModal() {
      this.isModalVisible = false;
      this.modalType = null;
    },
  },
});
