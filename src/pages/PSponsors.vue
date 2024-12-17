<template>
  <section class="w-full bg-gray-50 py-12">
    <div class="container mx-auto">
      <CModal
      :isVisible="isModalVisible"
      :filters="filters"
      @close="closeModal"
      @apply="applyFilters"
      @reset="resetFilters"
    />
      <!-- Jadval -->
      <CTable
        :data="paginatedData"
        :headers="tableHeaders"
        :columns="tableColumns"
      >
        <template #cell-full_name="{ row }">
          <span
            class="font-rubik font-medium text-sm/[15px] leading-4 text-black-100"
            >{{ row.full_name }}</span
          >
        </template>

        <template #cell-phone="{ row }">
          <span
            class="font-rubik text-sm leading-5 text-center text-black-100"
            >{{ row.phone }}</span
          >
        </template>

        <template #cell-get_status_display="{ row }">
          <div class="flex items-center space-x-4">
            <span
              :class="{
                'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full':
                  row.get_status_display === 'Yangi',
                'bg-green-100 text-green-700 px-3 py-1 rounded-full':
                  row.get_status_display === 'Tasdiqlangan',
                'bg-red-100 text-red-700 px-3 py-1 rounded-full':
                  row.get_status_display === 'Bekor qilingan',
              }"
            >
              {{ row.get_status_display }}
            </span>
          </div>
        </template>

        <!-- Amallar qismi (Actions) -->
        <template #cell-amallar="{ row }">
          <div class="flex space-x-2 justify-center">
            <!-- Eye Icon -->
            <img
              src="/eye.svg"
              alt="Ko'rish"
              class="cursor-pointer"
              @click="viewDetails(row)"
            />
          </div>
        </template>
      </CTable>

      <!-- Sahifalararo o‘tish -->
      <div class="mt-6 flex justify-between items-center">
        <CPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :itemsPerPage="itemsPerPage"
          :totalCount="total_count"
          :startIndex="start_index"
          :endIndex="end_index"
          @update:currentPage="setPage"
          @update:itemsPerPage="updateItemsPerPage"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import CTable from "../components/Base/CTable.vue";
import CPagination from "../components/Base/CPagination.vue";
import { getSponsorList } from "../services/api";
import  CModal  from "../components/Common/CModal.vue";
import { useRouter } from "vue-router"; // Router ishlatiladi

const router = useRouter(); // Routerni sozlash

// Reactive states
const data = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const total_count = ref(0);

const tableHeaders = [
  "#",
  "F.I.SH.",
  "Tel. raqami",
  "Homiylik summasi",
  "Sarflangan summa",
  "Sana",
  "Holati",
  "Amallar",
];
const tableColumns = [
  "index",
  "full_name",
  "phone",
  "sum",
  "spent",
  "created_at",
  "get_status_display",
  "amallar",
];

// Computed data for table rows
const paginatedData = computed(() => {
  return data.value.map((item, index) => ({
    index: start_index.value + index + 1,
    full_name: item.full_name,
    phone: formatPhone(item.phone),
    sum: formatSum(item.sum),
    spent: formatSum(item.spent),
    created_at: formatDate(item.created_at),
    get_status_display: item.get_status_display,
    id: item.id, // ID qo'shiladi
  }));
});

const start_index = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1,
);
const end_index = computed(() =>
  Math.min(start_index.value + itemsPerPage.value - 1, total_count.value),
);
const totalPages = computed(() =>
  Math.ceil(total_count.value / itemsPerPage.value),
);

// Fetch sponsors data from API
const fetchSponsors = async () => {
  try {
    const response = await getSponsorList({
      page: currentPage.value,
      page_size: itemsPerPage.value,
    });
    if (response.data) {
      data.value = response.data.results || [];
      total_count.value = response.data.count || 0;
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};

// Pagination functions
const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchSponsors();
  }
};

const updateItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  resetToFirstPage();
};

const resetToFirstPage = () => {
  currentPage.value = 1;
  fetchSponsors();
};

// Formatting functions
const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return `+998${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
};

const formatSum = (amount) =>
  `${Number(amount).toLocaleString("uz-UZ", { useGrouping: false })} UZS`;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Handle "Eye" icon click
const viewDetails = (row) => {
  router.push({ name: "SponsorDetail", params: { id: row.id } });
};

// Watchers
watch(itemsPerPage, () => {
  resetToFirstPage();
});

// Fetch data on mount
onMounted(fetchSponsors);
</script>
