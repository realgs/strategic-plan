<template>
  <div class="h-screen overflow-auto">
    <router-view />
  </div>
</template>

<script setup>
defineOptions({
    name: 'SimpleLayout',
});
</script>

<style scoped>
.h-screen {
    height: 100vh;
}
</style>
