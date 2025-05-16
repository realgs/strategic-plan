<template>
  <div
    class="
            relative
            flex
            h-full
            w-16
            flex-col
            items-center
            justify-between
            bg-gray-navbar
            pb-6
            font-sans
            transition-all
            duration-500
            ease-in-out
        "
  >
    <div class="flex flex-col items-center">
      <Tooltip
        :title="$t('notifications')"
        placement="right"
        strategy="fixed"
        wrap-class="whitespace-normal text-initial"
        tag="div"
        class="h-13 mt-5"
      >
        <Notifications />
      </Tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/tooltip/Tooltip.vue';
import Notifications from '@/modules/notifications/Notifications.vue';
import { state } from '@/store/store.js';

export default {
    name: 'ResellerLateralBar',
    components: { Notifications, Tooltip },
};
</script>
