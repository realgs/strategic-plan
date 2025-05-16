<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-400">
    <div class="absolute -left-[200px] -top-[100px] z-10 w-full h-full md:-left-[400px] md:-top-[150px] xl:-left-[800px] xl:-top-[300px]">
      <img 
        src="/gradient-bg.png" 
        alt="Background"
        class="blur-2xl scale-[3] animate-float"
      />
    </div>
    <slot />
  </div>
</template>

<script setup>
// Colorful layout component
</script>

<style>
@keyframes float {
  0% { transform: translateX(0px) translateY(0px); }
  25% { transform: translateX(20px) translateY(20px) rotate(30deg); }
  50% { transform: translateX(40px) translateY(0px); }
  75% { transform: translateX(20px) translateY(20px) rotate(-30deg); }
  100% { transform: translateX(-10px) translateY(-10px); }
}

.animate-float {
  animation: float 20s linear infinite alternate;
}
</style>
