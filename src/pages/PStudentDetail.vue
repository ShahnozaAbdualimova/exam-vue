<template>
  <section class="w-full bg-gray-50 py-12">
    <div class="container mx-auto">
      <button @click="goBack" class="text-blue-500 mb-5">Orqaga qaytish</button>
      <div v-if="student" class="bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-xl font-bold mb-4">{{ student.full_name }}</h1>
        <p><strong>Talabalik turi:</strong> {{ student.type }}</p>
        <p><strong>OTM:</strong> {{ student.institute.name }}</p>
        <p>
          <strong>Kontrakt miqdori:</strong>
          {{ formatCurrency(student.contract) }}
        </p>
        <p>
          <strong>Ajratilgan summa:</strong> {{ formatCurrency(student.given) }}
        </p>
      </div>
      <div v-else class="text-center">Talaba ma'lumotlari yuklanmoqda...</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getStudentDetails } from "../services/api";

const route = useRoute();
const router = useRouter();
const student = ref(null);

const fetchStudentDetails = async () => {
  try {
    const response = await getStudentDetails(route.params.id);
    student.value = response.data;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};

const goBack = () => {
  router.back();
};

const formatCurrency = (amount) =>
  `${Number(amount).toLocaleString("uz-UZ")} UZS`;

onMounted(fetchStudentDetails);
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
