<template>
  <div class="absolute right-0 top-0 z-50 mr-10 mt-8 h-12">
    <AdvancedDropdown
      ref="menuDropdown"
      placement="bottom-end"
      strategy="fixed"
    >
      <template #trigger>
        <div class="flex cursor-pointer items-center gap-4">
          <div class="text-right">
            <p class="font-semibold">
              {{ adviser.adviser.firstName }} {{ adviser.adviser.lastName }}
            </p>
            <p>{{ adviser.adviser.email }}</p>
          </div>
          <div>
            <UserAvatar
              :username="`${adviser.adviser.firstName} ${adviser.adviser.lastName}`"
              class="h-14 w-14 text-sm"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div
          class="mt-2 min-w-84 rounded-xl bg-neutral-1 p-6 text-font-primary shadow-xl"
        >
          <AdviserRoleUserMenuAccountsDropdown
            v-if="employees.length > 1"
            :employees="employees"
          >
            <div class="align-items flex cursor-pointer mb-4 items-center">
              <div class="flex w-10 justify-center">
                <Icon
                  name="icon-chevron-left"
                  class="mr-3"
                />
              </div>
              <p>{{ $filters.capitalize($t('myAccounts')) }}</p>
            </div>
          </AdviserRoleUserMenuAccountsDropdown>

          <div
            class="align-items mb-4 flex cursor-pointer"
            @click="handleFormVisibility(true)"
          >
            <div class="flex w-10 justify-center">
              <Icon
                name="icon-settings"
                class="mr-3"
              />
            </div>
            <p>{{ $filters.capitalize($t('configuration')) }}</p>
          </div>
          <div
            class="align-items flex cursor-pointer"
            @click="logout"
          >
            <div class="flex w-10 justify-center">
              <Icon
                name="icon-logout"
                class="mr-3"
              />
            </div>
            <p>{{ $filters.capitalize($t('logout')) }}</p>
          </div>
        </div>
      </template>
    </AdvancedDropdown>
    <AdvancedDropdown
      ref="menuDropdownConfig"
      placement="bottom-end"
    >
      <template #trigger>
        <span />
      </template>
      <template #content>
        <div class="mt-2 min-w-32 rounded-xl bg-neutral-1 p-6 text-font-primary shadow-xl mb-16">
          <AdviserRolseUserMenuConfiguration
            :adviser="adviser"
            @comeBack="handleFormVisibility(false)"
          />
        </div>
      </template>
    </AdvancedDropdown>
  </div>
</template>

<script>
import { state } from '@/store/store.js';
import UserAvatar from '@/components/user-avatar/UserAvatar.vue';
import AdvancedDropdown from '@/components/good-dropdown/Dropdown.vue';
import AdviserRolseUserMenuConfiguration from '@/layouts/adviser/components/AdviserRoleUserMenuConfiguration.vue';
import AdviserRoleUserMenuAccountsDropdown from '@/layouts/adviser/components/AdviserRoleUserMenuAccountsDropdown.vue';
import { Auth } from '@/api/models';
import { notify } from '@/components-v2/HrNotifications/index.js';

export default {
    name: 'AdviserRoleUserMenu',
    components: {
        AdviserRoleUserMenuAccountsDropdown,
        AdviserRolseUserMenuConfiguration,
        AdvancedDropdown,
        UserAvatar,
    },
    computed: {
        employees () {
            return state.employees;
        },
        adviser () {
            return state.adviser;
        },
        currentEmployee () {
            return state && state.employee;
        },
    },
    methods: {
        async handleFormVisibility (status) {
            if (status === true) {
                this.$refs.menuDropdown.close();
                this.$refs.menuDropdownConfig.open();
            } else {
                this.$refs.menuDropdownConfig.close();
                this.$refs.menuDropdown.open();
            }
        },
        async logout () {
            try {
                this.loading = true;
                await Auth.logout();
                await this.$router.push({ name: 'login' });
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
