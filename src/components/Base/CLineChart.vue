<template>
  <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto">
    <h2 class="text-lg font-bold mb-4">Homiylar va Talabalar Soni</h2>
    <apexchart
      type="line"
      height="402px"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Chart data
const series = ref([
  {
    name: "Homiylar",
    data: [0, 150, 500, 1284, 1100, 1200, 650, 700, 1500, 1800, 2000, 2300],
  },
  {
    name: "Talabalar",
    data: [150, 100, 300, 1153, 1300, 1400, 500, 550, 1600, 1900, 2100, 2500],
  },
]);

// Chart options
const chartOptions = ref({
  chart: {
    type: "line",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  colors: ["#4A90E2", "#FF6B6B"],
  xaxis: {
    categories: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ],
    labels: {
      style: {
        colors: "#9aa0ac",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      formatter: (val) => `${val.toLocaleString()}`,
      style: {
        colors: "#9aa0ac",
        fontSize: "12px",
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val) => `${val.toLocaleString()}`,
    },
  },
  grid: {
    borderColor: "#e7e7e7",
    strokeDashArray: 4,
  },
  markers: {
    enabled: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    labels: {
      colors: "#000",
    },
  },
});
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f9fafb;
}
</style>
