<template>
  <div class="bg-white w-full overflow-x-hidden">
    <div class="relative z-10 w-full overflow-x-hidden overflow-y-auto bg-white">
      <IconDotsBlankPage class="absolute top-0 -z-10 w-screen min-h-20 sm:w-full sm:min-h-full" />
      <slot />
    </div>
  </div>
</template>

<script>
import IconDotsBlankPage from '@/components/icons/IconDotsBlankPage';

export default {
    name: 'DotsLayout',
    components: { IconDotsBlankPage },
};
</script>
