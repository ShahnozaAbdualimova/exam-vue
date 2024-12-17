<template>
  <LHeader />
    <LNavbar />
  <main>


    <transition
      name="fade"
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <router-view />
    </transition>
  </main>
</template>

<script setup>
import LHeader from "@/components/Layout/LHeader.vue";
import LNavbar from "@/components/Layout/LNavbar.vue";

const beforeEnter = (el) => {
  el.style.opacity = 0;
};

const enter = (el, done) => {
  el.offsetHeight;
  el.style.transition = "opacity 0.5s ease-in-out";
  el.style.opacity = 1;
  done();
};

const leave = (el, done) => {
  el.style.transition = "opacity 0.5s ease-in-out";
  el.style.opacity = 0;
  done();
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
