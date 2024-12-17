<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { RouterLink } from "vue-router";

const login = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = () => {
  if (login.value && password.value) {
    router.push("/");
    toast("Tizimga kirish amalga oshirildi", {
      autoClose: 1000,
      type: "success",
    });
  } else {
    toast("Iltimos formani to'ldiring", {
      autoClose: 1000,
      type: "error",
    });
  }
};
</script>

<template>
  <div class="bg-grey-100 flex justify-center items-center h-screen">
    <div>
      <img class="mx-auto" src="/auth-logo.svg" alt="logo" />

      <div
        class="bg-white mt-12 w-[379px] h-auto p-8 rounded-xl border border-grey-200"
      >
        <h3 class="text-black text-2xl font-bold leading-7">Kirish</h3>
        <form @submit.prevent="handleLogin" class="mt-10 h-auto">
          <label
            for="login"
            class="text-black-100 text-xs font-medium leading leading-3.5 uppercase"
            >Login</label
          >
          <input
            class="w-full mt-2 mb-5 border border-blue-100 rounded-md py-3 pl-4"
            v-model="login"
            type="text"
            name="login"
            id="login"
            placeholder="adm8904"
            autocomplete="username"
          />

          <label
            for="password"
            class="text-black-100 text-xs font-medium leading leading-3.5 uppercase"
            >Parol</label
          >
          <input
            class="w-full mt-2 mb-5 border border-blue-100 rounded-md py-3 pl-4"
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••••"
            autocomplete="current-password"
          />
          <img src="/recaptcha.svg" alt="" />
          <button
            type="submit"
            class="bg-blue-200 mt-5 w-full rounded-lg py-4 text-white"
          >
            <!-- <span class="text-white text-base font-medium leading-5">Kirish</span> -->
            <RouterLink to="/" /> Kirish
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
/* style code if needed */
</style>
