<template>
  <section class="w-full bg-grey-100 py-12">
    <div class="container mx-auto">
      <!-- Sum Info Section -->
      <div class="grid grid-cols-3 gap-7">
        <div
          v-for="(item, index) in sumInfo"
          :key="index"
          class="flex justify-start h-24 rounded-lg p-6 items-center gap-4 bg-white col-span-1"
        >
          <img :src="item.img" alt="sum image" />
          <div>
            <p class="font-rubik text-xs leading-3 text-black-200">
              {{ item.subTitle }}
            </p>
            <p
              class="mt-1.5 font-bold font-rubik text-xl leading-5 text-black-300"
            >
              {{ item.price }}
              <span class="text-black-400">{{ item.currency }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Line Chart Section -->
      <div class="mt-12">
        <LineChart />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LineChart from "../Base/CLineChart.vue";
import { getDashboardData } from "@/services/api";

// Reactive reference to hold data
const sumInfo = ref([]);

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await getDashboardData();
    const data = response.data;

    // Update sumInfo dynamically with fetched data
    sumInfo.value = [
      {
        img: "/sum-1.svg",
        subTitle: "Jami to‘langan summa",
        price: data.total_paid.toLocaleString("en-US").replace(/,/g, " "), // Format to '250 084 129'
        currency: "UZS",
      },
      {
        img: "/sum-2.svg",
        subTitle: "Jami so‘ralgan summa",
        price: data.total_need.toLocaleString("en-US").replace(/,/g, " "), // Format to '14 098 530 000'
        currency: "UZS",
      },
      {
        img: "/sum-3.svg",
        subTitle: "To‘lanishi kerak summa",
        price: data.total_must_pay.toLocaleString("en-US").replace(/,/g, " "), // Format to '12 414 205 000'
        currency: "UZS",
      },
    ];
  } catch (error) {
    console.error("API error:", error);
  }
});
</script>

<style scoped></style>
