<template>
  <div
    class="flex md:flex-row flex-col md:justify-start justify-between gradient-bg min-h-full h-auto"
  >
    <div class="md:absolute relative top-0 left-0 z-10 px-5 py-5 md:px-12 md:py-10 h-24">
      <img
        class="md:h-24 h-14 w-auto"
        src="/images/logo-white.svg"
        alt
      >
    </div>

    <div class="hidden w-1/2 md:flex" />

    <div class="relative flex w-full h-full items-center flex-1 self-center justify-center md:w-1/2 z-10 md:px-0 px-2 md:pb-0 pb-2">
      <div class="w-full px-6 py-4 md:max-w-sm rounded-xl bg-white shadow-modal">
        <slot />
      </div>
    </div>

    <div class="fixed gradient-left">
      <img
        class="md:block hidden"
        src="/images/register.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script>

export default {
    name: 'ColorfulLayout',
    mounted () {
        document.body.style.overflowY = 'auto';
    },
};
</script>

<style scoped>
.gradient-left {
  left: -200px;
  top: -100px;
  z-index: 1;
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .gradient-left {
    left: -400px;
    top: -150px;
  }
}

@media (min-width: 1280px) {
  .gradient-left {
    left: -800px;
    top: -300px;
  }
}

.gradient-left img {
  filter: blur(30px);
  transform: scale(3);
  animation: pan 20s linear infinite alternate;
}

.gradient-bg {
  background: linear-gradient(30deg, #C063FF 0%, #AEA9FF 100%);
  height: auto!important;
}

@keyframes pan {
  0% {transform: translateX(0px) translateY(0px);}
  25% {transform: translateX(20px) translateY(20px) rotate(30deg);}
  50% {transform: translateX(40px) translateY(0px);}
  75% {transform: translateX(20px) translateY(20px) rotate(-30deg);}
  100% {transform: translateX(-10px) translateY(-10px);}
}
</style>
