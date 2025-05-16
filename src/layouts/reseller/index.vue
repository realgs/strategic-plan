<template>
  <div class="relative flex h-full w-full overflow-y-auto ">
    <template v-if="reseller">
      <SidebarReseller />
      <div class="flex flex-col items-end flex-1 relative h-full overflow-y-auto px-8 pt-3 pb-12">
        <ResellerUserMenu />
        <slot />
      </div>
    </template>
  </div>
</template>

<script>
import { state } from '@/store/store.js';
import SidebarReseller from '@/layouts/reseller/Sidebar.vue';
import ResellerUserMenu from '@/layouts/reseller/components/ResellerUserMenu.vue';

export default {
    name: 'ResellerLayout',
    components: { ResellerUserMenu, SidebarReseller },
    computed: {
        reseller () {
            return state.reseller;
        },
    },
};
</script>
