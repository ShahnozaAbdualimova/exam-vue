<template>
  <div class="flex justify-between items-center gap-3 w-full">
    <p class="font-rubik text-sm/[15px] leading-5 text-custom-black">
      {{ totalCount }} tadan {{ startIndex }}-{{ endIndex }} ko‘rsatilmoqda
    </p>
    <div class="flex justify-between items-center gap-2">
      <p>Ko'rsatish</p>
      <select
        :value="itemsPerPage"
        @change="resetToFirstPage"
        class="px-2 py-1 border rounded"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium rounded disabled:opacity-50"
      >
        &lt;
      </button>

      <div class="flex gap-1 items-end">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="setPage(page)"
          :class="[
            'px-3 py-1 rounded',
            page === currentPage
              ? 'bg-blue-500 text-white border border-blue-500'
              : 'bg-gray-200 text-gray-600',
          ]"
        >
          {{ page }}
        </button>
        <span v-if="shouldShowDots">...</span>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  startIndex: {
    type: Number,
    required: true,
  },
  endIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage", "update:itemsPerPage"]);

const visiblePages = computed(() => {
  const maxVisible = 5;
  const pages = [];
  for (
    let i = Math.max(props.currentPage - 2, 1);
    i <= Math.min(props.currentPage + 2, props.totalPages);
    i++
  ) {
    pages.push(i);
  }
  return pages;
});

const shouldShowDots = computed(
  () => props.totalPages > 5 && visiblePages.value.at(-1) < props.totalPages,
);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("update:currentPage", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("update:currentPage", props.currentPage + 1);
  }
};

const setPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("update:currentPage", page);
  }
};

const resetToFirstPage = (event) => {
  const newItemsPerPage = parseInt(event.target.value, 10);
  emit("update:itemsPerPage", newItemsPerPage);
  emit("update:currentPage", 1);
};
</script>
