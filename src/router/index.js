import { createRouter, createWebHistory } from "vue-router";
import SponsorDetail from "../pages/PSponsorsDetails.vue"; // Import SponsorDetail component
import StudentDetail from "../pages/PStudentDetail.vue";

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use base URL for history mode
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/PHome.vue"),
    },

    {
      path: "/auth",
      name: "auth",
      component: () => import("../pages/PAuth.vue"),
    },

    {
      path: "/chart-item",
      name: "chart-item",
      component: () => import("../components/Common/chart-item.vue"), // Lazy load chart-item component
    },

    {
      path: "/sponsors",
      name: "sponsors",
      component: () => import("../pages/PSponsors.vue"),
    },

    {
      path: "/sponsor/:id",
      name: "SponsorDetail",
      component: SponsorDetail,
      props: true,
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../pages/PStudents.vue"), // Students sahifasini ulash
    },
    {
      path: "/student-detail/:id",
      name: "StudentDetail",
      component: StudentDetail,
      props: true,
    },
  ],
});

export default router;
