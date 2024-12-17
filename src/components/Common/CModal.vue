<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black-100 bg-opacity-50 w-full h-full flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white rounded-lg shadow-lg w-[586px] h-auto p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700">{{ title }}</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl">
          &times;
        </button>
      </div>

      <!-- Body -->
      <div class="space-y-4">
        <!-- Dinamik kontent -->
        <slot></slot>
      </div>

      <!-- Footer -->
      <div class="flex justify-end items-center mt-6 space-x-4">
        <button
          @click="reset"
          class="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
        >
          Tozalash
        </button>
        <button
          @click="apply"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal",
    },
  },
  emits: ["close", "apply", "reset"],
  methods: {
    close() {
      this.$emit("close");
    },
    apply() {
      this.$emit("apply");
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
/* Modal Styles */
</style>
