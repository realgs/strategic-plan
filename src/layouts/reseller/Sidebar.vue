<template>
  <div class="flex h-full">
    <ResellerLateralBar />
    <ResellerMenu />
  </div>
</template>

<script>
import ResellerMenu from '@/layouts/reseller/components/ResellerMenu.vue';
import ResellerLateralBar from '@/layouts/reseller/components/ResellerLateralBar.vue';

export default {
    name: 'SidebarReseller',
    components: { ResellerLateralBar, ResellerMenu },
};
</script>
