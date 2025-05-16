<template>
  <div
    id="sidebar"
    class="group relative bg-white font-sans transition-all duration-500 ease-in-out"
    :class="{
      'w-64 ': isOpen,
      'w-16 items-center': !isOpen,
    }"
  >
    <div class="flex h-full flex-col overflow-auto">
      <div class="flex h-full flex-col">
        <!-- LOGO -->
        <div class="flex h-20 items-center justify-between px-4">
          <router-link
            :to="{ name: 'user' }"
            class="flex items-center"
          >
            <img
              v-show="isOpen"
              :src="logoPath"
              class="max-h-12 w-38"
              alt=""
            >
            <img
              v-show="!isOpen"
              :src="smallLogoPath"
              class="w-8"
              alt=""
            >
          </router-link>
        </div>
        <div class="mt-6 h-full min-h-0 flex-1 pb-6">
          <router-link
            v-slot="{ navigate, isActive, route, href }"
            :to="{ name: 'ResellerClients' }"
            class="menuOnHoverMenu"
          >
            <div class="hoverItem transition rounded-md duration-300 ease-in-out pl-4">
              <SidebarItem
                :route="{ ...route, key: 'customers', name: 'ResellerClients' }"
                :active="isActive"
                :navigate="navigate"
                :href="href"
                :is-open="isOpen"
                :is-admin-view="true"
                :is-end-open="true"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { state } from '@/store/store.js';
import SidebarItem from '@/modules/heroes/sidebar/SidebarItem.vue';

export default {
    name: 'ResellerMenu',
    components: { SidebarItem },
    data () {
        return {
            isOpen: true,
        };
    },
    computed: {
        hasGSID () {
            return state.GSID;
        },
        smallLogoPath () {
            return '/images/logo_small.svg';
        },
        logoPath () {
            return '/images/logo.svg';
        },
    },
};
</script>
