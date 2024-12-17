<template>
  <section class="w-full bg-gray-50 py-12">
    <div class="container mx-auto">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-8"
      >
        <img src="/back-icon.svg" alt="Back" class="w-4 h-4" />
        <span class="text-sm font-medium">Orqaga qaytish</span>
      </button>

      <!-- Sponsor Details -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-xl font-bold text-gray-800 mb-6">
          Homiy haqida ma'lumot
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-gray-600">F.I.SH.:</p>
            <p v-if="sponsor">{{ sponsor.full_name }}</p>
            <p v-else><strong>Sponsor ma'lumotlari yuklanmoqda...</strong></p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600">Tel. raqami:</p>
            <p class="text-base text-gray-800" v-if="sponsor">
              {{ sponsor.phone }}
            </p>
            <p v-else><strong>Sponsor ma'lumotlari yuklanmoqda...</strong></p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600">Homiylik summasi:</p>
            <p v-if="sponsor" class="text-base text-gray-800">
              {{ formatSum(sponsor.sum) }}
            </p>
            <p v-else><strong>Sponsor ma'lumotlari yuklanmoqda...</strong></p>
          </div>
          <div v-if="sponsor && sponsor.is_legal">
            <p class="text-sm font-semibold text-gray-600">Tashkilot nomi:</p>
            <p class="text-base text-gray-800">{{ sponsor.firm }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600">Holati:</p>
            <span
              v-if="sponsor"
              :class="{
                'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full':
                  sponsor.get_status_display === 'Moderatsiyada',
                'bg-green-100 text-green-700 px-3 py-1 rounded-full':
                  sponsor.get_status_display === 'Tasdiqlangan',
                'bg-red-100 text-red-700 px-3 py-1 rounded-full':
                  sponsor.get_status_display === 'Bekor qilingan',
              }"
              class="text-base"
            >
              {{ sponsor.get_status_display }}
            </span>
            <p v-else><strong>Sponsor ma'lumotlari yuklanmoqda...</strong></p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600">Izoh:</p>
            <p
              v-if="sponsor && sponsor.comment"
              class="text-base text-gray-800"
            >
              {{ sponsor.comment }}
            </p>
            <p v-else class="text-gray-500 text-sm">Izoh mavjud emas</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600">Sana:</p>
            <p
              v-if="sponsor && sponsor.created_at"
              class="text-base text-gray-800"
            >
              {{ formatDate(sponsor.created_at) }}
            </p>
            <p v-else class="text-gray-500 text-sm">Sana mavjud emas</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const sponsor = ref(null); // Homiy ma'lumotlari

const fetchSponsorDetails = async () => {
  try {
    const response = await axios.get(
      `https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${route.params.id}/`,
    );
    sponsor.value = response.data;
  } catch (error) {
    console.error("Homiy ma'lumotlarini olishda xatolik yuz berdi:", error);
  }
};

  const goBack = () => {
    router.back();
  };

  // Formatting functions
  const formatSum = (amount) =>
    `${Number(amount).toLocaleString("uz-UZ", { useGrouping: true })} UZS`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fetch data on mount
  onMounted(fetchSponsorDetails);
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
