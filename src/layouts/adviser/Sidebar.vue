<template>
  <CustomScrollbar
    class="border bg-white shadow-lg transition-all duration-500 ease-in-out sticky h-full overflow-y-auto thin-custom-scrollbar w-88"
  >
    <div class="p-4">
      <AdviserCompanySelector />
      <AdviserPendingRequests />
      <AdviserMenu />
    </div>
  </CustomScrollbar>
</template>

<script>
import AdviserMenu from '@/layouts/adviser/components/AdviserMenu.vue';
import AdviserCompanySelector from '@/layouts/adviser/components/AdviserCompanySelector.vue';
import AdviserPendingRequests from '@/layouts/adviser/components/AdviserPendingRequests.vue';
import CustomScrollbar from '@/components/scrollbar/CustomScrollbar.vue';

export default {
    name: 'SidebarAdviser',
    components: { CustomScrollbar, AdviserPendingRequests, AdviserCompanySelector, AdviserMenu },
};
</script>
