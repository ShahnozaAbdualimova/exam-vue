<script setup>




</script>

<template>
  <button
    :style="buttonStyle"
    type="button"
    class="flex justify-center items-center gap-2 h-10 rounded-md font-rubik cursor-pointer"
  >
    <slot></slot>
  </button>
</template>
