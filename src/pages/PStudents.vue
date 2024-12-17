<template>
  <section class="w-full bg-gray-50 py-12">
    <div class="container mx-auto">
      <div class="flex justify-end items-center">
        <CButton class="py-4 px-8 bg-blue-300 rounded-md font-medium text-white leading-6 mb-7">
          Talaba qo'shish
        </CButton>
      </div>

      <!-- Jadval -->
      <CTable
        :data="paginatedData"
        :headers="tableHeaders"
        :columns="tableColumns"
      >
        <template #cell-full_name="{ row }">
          <span class="font-rubik text-sm text-black">{{ row.full_name }}</span>
        </template>

        <template #cell-type="{ row }">
          <span class="font-rubik text-sm text-black">{{
            formatType(row.type)
          }}</span>
        </template>

        <template #cell-institute="{ row }">
          <span class="font-rubik text-sm text-black">{{
            row.institute.name
          }}</span>
        </template>

        <template #cell-contract="{ row }">
          <span class="font-rubik text-sm text-black">{{
            formatCurrency(row.contract)
          }}</span>
        </template>

        <template #cell-given="{ row }">
          <span class="font-rubik text-sm text-black">{{
            formatCurrency(row.given)
          }}</span>
        </template>

        <template #cell-get_status_display="{ row }">
          <span :class="statusClass(row.get_status_display)">
            {{ row.get_status_display }}
          </span>
        </template>

        <template #cell-amallar="{ row }">
          <button @click="viewDetails(row)" class="text-blue-500">
            <img src="/eye.svg" alt="Ko'rish" />
          </button>
        </template>
      </CTable>

      <div class="mt-6 flex justify-between items-center">
        <CPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :itemsPerPage="itemsPerPage"
          :totalCount="total_count"
          @update:currentPage="setPage"
          @update:itemsPerPage="updateItemsPerPage"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CTable from "../components/Base/CTable.vue";
import CPagination from "../components/Base/CPagination.vue";
import { getStudentList } from "../services/api";
import { useRouter } from "vue-router";
import CButton from "@/components/Base/CButton.vue";

const router = useRouter();
const data = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const total_count = ref(0);

const tableHeaders = [
  "#",
  "F.I.SH.",
  "Talabalik turi",
  "OTM",
  "Kontrakt miqdori",
  "Ajratilgan summa",
  "Amallar",
];
const tableColumns = [
  "index",
  "full_name",
  "type",
  "institute",
  "contract",
  "given",
  "amallar",
];

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return data.value.map((item, index) => ({
    ...item,
    index: startIndex + index + 1,
  }));
});

const totalPages = computed(() =>
  Math.ceil(total_count.value / itemsPerPage.value),
);

const fetchStudents = async () => {
  try {
    const response = await getStudentList({
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

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchStudents();
  }
};

const updateItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  resetToFirstPage();
};

const resetToFirstPage = () => {
  currentPage.value = 1;
  fetchStudents();
};

const formatType = (type) => {
  const types = {
    1: "Bakalavr",
    2: "Magistr",
  };
  return types[type] || "Noma'lum";
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
  }).format(value);
};

const statusClass = (status) => {
  return {
    "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full": status === "Yangi",
    "bg-green-100 text-green-700 px-3 py-1 rounded-full":
      status === "Tasdiqlangan",
    "bg-red-100 text-red-700 px-3 py-1 rounded-full":
      status === "Bekor qilingan",
  };
};

const viewDetails = (row) => {
  router.push({ name: "StudentDetail", params: { id: row.id } });
};

onMounted(fetchStudents);
</script>
