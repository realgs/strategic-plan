<template>
  <div class="flex items-center rounded-full bg-gray-300 px-4 py-2 bg-primary-100">
    <Dropdown
      placement="bottom-end"
      arrow-class="border-white"
      content-class="z-20"
    >
      <template #trigger>
        <button
          class="focus:outline-none inline-flex items-center rounded-lg px-3 py-1 focus:ring"
        >
          <UserAvatar
            class="h-8 w-8 text-xs"
            :username="reseller.name"
            :employee="reseller"
          />
          <div class="ml-2 flex hidden items-center text-left xl:block">
            <p class="truncate hidden text-sm font-bold text-gray-800 sm:block">
              {{ reseller.name }}
            </p>
          </div>
          <Icon
            name="icon-chevron-down"
            class="text-gray-700"
          />
        </button>
      </template>
      <template #content>
        <div class="w-auto min-w-64 rounded-xl bg-white shadow-md">
          <div
            id="click-admin-header-logout"
            class="border-t flex w-full cursor-pointer items-center justify-center border-gray-200 px-4 py-5 text-sm hover:rounded-b-xl hover:bg-gray-100"
            @click="logout"
          >
            {{ $filters.capitalize($t('logout')) }}
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { mutations, state } from '@/store/store.js';
import { Auth } from '@/api/models';
import { notify } from '@/components-v2/HrNotifications/index.js';
import UserAvatar from '@/components/user-avatar/UserAvatar.vue';
import Dropdown from '@/components/good-dropdown';

export default {
    name: 'ResellerUserMenu',
    components: { Dropdown, UserAvatar },
    computed: {
        reseller () {
            return state.reseller;
        },
    },
    methods: {
        async logout () {
            try {
                this.loading = true;
                await Auth.logout();
                mutations.setAuth(null);
                await this.$router.push({ name: 'login' });
                await this.$nextTick();
                await mutations.resetAuth();
            } catch (error) {
                notify({
                    title: 'Logout',
                    text: error,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
