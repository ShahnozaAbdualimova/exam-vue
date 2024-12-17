<script setup>
import { useNavbarStore } from "./store/navbarStore";
import CModal from "./components/Common/CModal.vue";
import PHome from "./pages/PHome.vue";

const navbarStore = useNavbarStore();

const handleApply = () => {
  console.log("Filter saqlandi");
};

const handleReset = () => {
  console.log("Filter tozalandi");
};
</script>

<template>
  <div>
    <PHome/>
    <!-- <router-view /> -->

    <!-- Student Modal -->
    <CModal
      v-if="navbarStore.isModalVisible && navbarStore.modalType === 'studentFilter'"
      :isVisible="navbarStore.isModalVisible"
      title="Talabalar uchun filter"
      @close="navbarStore.closeModal"
      @apply="handleApply"
      @reset="handleReset"
    >
      <div>
        <p>Talabalar uchun maxsus filter.</p>
        <label class="block text-sm font-medium text-gray-700">Talabalik Turi</label>
        <select class="mt-2 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="all">Barchasi</option>
          <option value="bakalavr">Bakalavr</option>
          <option value="magistr">Magistr</option>
        </select>
      </div>
    </CModal>

    <!-- Sponsor Modal -->
    <CModal
      v-if="navbarStore.isModalVisible && navbarStore.modalType === 'sponsorFilter'"
      :isVisible="navbarStore.isModalVisible"
      title="h uchun filter"
      @close="navbarStore.closeModal"
      @apply="handleApply"
      @reset="handleReset"
    >
      <div>
        <p>Homiylar uchun maxsus filter.</p>
        <label class="block text-sm font-medium text-gray-700">Homiy Turi</label>
        <select class="mt-2 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="all">Barchasi</option>
          <option value="individual">Shaxsiy</option>
          <option value="company">Kompaniya</option>
        </select>
      </div>
    </CModal>
  </div>
</template>
