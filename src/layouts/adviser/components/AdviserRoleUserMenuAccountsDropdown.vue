<template>
  <AdvancedDropdown
    placement="left-start"
    class="w-64"
    arrow-class="border-white"
    content-class="z-20"
  >
    <template #trigger>
      <slot />
    </template>

    <template #content>
      <div class="mr-8 w-72 rounded-xl bg-white shadow-md">
        <template v-for="(employee, index) in employees">
          <div
            :key="index"
            class="flex items-center space-x-2 px-4 first:rounded-t-xl last:rounded-b-xl last:bg-primary-100 hover:bg-gray-100"
          >
            <div
              :id="employee.id"
              class="border-b flex cursor-pointer items-center py-3 px-4"
              @click="changeEmployee(employee)"
            >
              <div class="mr-4 flex items-center space-x-2">
                <UserAvatar
                  class="h-10 w-10 min-w-10 text-xs"
                  :src="employee.imageProfileURL"
                  :username="
                    employee.firstName
                      ? `${employee.firstName} ${employee.lastName}`
                      : `${employee.adviser.firstName} ${employee.adviser.lastName}`
                  "
                  :employee="employee"
                />
              </div>
              <div class="flex flex-col text-sm font-semibold">
                <template v-if="employee.myCompany">
                  {{ employee.myCompany.name }}
                </template>
                <template v-if="employee.adviser">
                  Consultoría
                </template>
                <span class="font-normal">
                  <template v-if="employee.firstName">{{ `${employee.firstName} ${employee.lastName}` }}
                  </template>
                  <template v-if="employee.adviser">{{ employee.adviser.fullName }} </template>
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </AdvancedDropdown>
</template>

<script>
import AdvancedDropdown from '@/components/good-dropdown/Dropdown.vue';
import { mutations } from '@/store/store.js';
import EventBus from '@/utils/eventBus';
import UserAvatar from '@/components/user-avatar/UserAvatar.vue';

export default {
    name: 'AdviserRoleUserMenuAccountsDropdown',
    components: { UserAvatar, AdvancedDropdown },
    props: {
        employees: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async changeEmployee (employee) {
            await mutations.setEmployee(employee, employee.myCompany?.id);
            if (!employee.adviser) {
                await this.$router.push({ name: 'home' }).catch(() => ({}));
            }
            EventBus.emit('changedEmployee');
        },
    },
};
</script>
