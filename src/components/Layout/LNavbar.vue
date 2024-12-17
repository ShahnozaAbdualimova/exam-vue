<script setup>
import { RouterLink, useRoute } from "vue-router";
import CButton from "../Base/CButton.vue";
import { useNavbarStore } from "../../store/navbarStore";

const route = useRoute();
const navbarStore = useNavbarStore();

const handleSearch = (event) => {
  navbarStore.setSearchQuery(event.target.value);
};

const handleFilterClick = () => {
  if (route.path === "/sponsors") {
    navbarStore.openModal("sponsorFilter");
  } else if (route.path === "/students") {
    navbarStore.openModal("studentFilter");
  }
};

const linkClass = (path) => [
  "py-3.5 w-48 text-center border border-pink-100",
  route.path === path
    ? "bg-blue-300 text-white"
    : "bg-transparent text-blue-400",
];
</script>

<template>
  <div class="bg-grey-400">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center">
        <!-- Links -->
        <div class="flex justify-center items-center">
          <RouterLink to="/chart-item" :class="linkClass('/chart-item')">
            Dashboard
          </RouterLink>
          <RouterLink to="/sponsors" :class="linkClass('/sponsors')">
            Homiylar
          </RouterLink>
          <RouterLink to="/students" :class="linkClass('/students')">
            Talabalar
          </RouterLink>
        </div>

        <!-- Search & Filter -->
        <div class="flex items-center gap-5">
          <form
            class="flex items-center gap-2 w-72 h-10 bg-grey-500 pl-2.5 rounded-md"
          >
            <img src="/search.svg" alt="" />
            <input
              type="search"
              placeholder="Izlash"
              class="bg-transparent w-full h-full focus:outline-none"
              @input="handleSearch"
            />
          </form>
          <CButton
            class="flex items-center gap-2 w-32 bg-grey-600 h-10 text-blue-500 rounded-md font-rubik"
            @click="handleFilterClick"
          >
            <img src="/filter.svg" alt="" />
            Filter
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>
