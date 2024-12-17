import "./assets/main.css"; // CSS faylini import qilish
import { createApp } from "vue"; // Vue ilovasini yaratish
import App from "./App.vue"; // Asosiy App komponent
import router from "./router"; // Routerni import qilish
import VueApexCharts from "vue3-apexcharts"; // ApexCharts uchun kutubxona
import { createPinia } from "pinia"; // Pinia do'koni

// Vue ilovasini yaratish
const app = createApp(App);

// Pinia instansiyasini yaratish
const pinia = createPinia();

// Global komponent sifatida VueApexCharts-ni ro'yxatdan o'tkazish
app.component("apexchart", VueApexCharts);

// Pinia va Routerni Vue ilovasiga ulash
app.use(pinia);
app.use(router);

// Ilovani "#app" DOM elementi ichiga o'rnatish
app.mount("#app");
