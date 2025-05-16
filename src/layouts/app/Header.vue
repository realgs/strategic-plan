<template>
  <div class="hidden items-center sm:flex">
    <div
      v-if="isAdmin && !isCustomRole"
      class="mr-3 items-center sm:flex"
    >
      <Finder id="click-admin-header-search-open">
        <Tooltip
          :title="$filters.capitalize($tc('search'))"
        >
          <HrButton
            icon="icon-search"
            appearance="tertiary"
            class="mr-3"
            size="large"
          />
        </Tooltip>
      </Finder>
    </div>
    <div
      class="flex justify-end rounded-xl bg-neutral-1 shadow-light_sm"
    >
      <div
        ref="container"
        class="flex-none inline-flex items-center px-4 py-2 h-12"
      >
        <Permissions
          company-module="check"
          class="flex-none"
        >
          <div class="border-r border-neutral-200 xl:mr-3 xl:border-neutral-200 xl:pr-6">
            <TimeTracker :is-admin="isAdmin" />
          </div>
        </Permissions>
        <Dropdown
          placement="bottom-end"
          arrow-class="border-white"
          content-class="z-20"
        >
          <template #trigger>
            <button
              class="focus:outline-none inline-flex items-center rounded-lg px-3 "
            >
              <HrAvatar
                :src="currentEmployee && currentEmployee.imageProfileURL"
                :name="`${ currentEmployee.firstName } ${ currentEmployee.lastName }`"
                size="sm"
              />

              <div
                v-if="!isDigitalClockActive"
                class="ml-2 text-left leading-none headerProfileName"
              >
                <p class="truncate hidden text-sm font-semibold text-font-primary sm:block">
                  {{ `${currentEmployee.firstName} ${currentEmployee.lastName}` }}
                </p>
              </div>

              <Icon
                name="icon-chevron-down"
                class="text-font-secondary ml-3"
                size="small"
              />
            </button>
          </template>

          <template #content="{ close, isOpen }">
            <transition
              enter-active-class="transition-all transition-slow ease-out overflow-hidden"
              leave-active-class="transition-all transition-slow ease-in overflow-hidden"
              enter-class="opacity-0 mt-6"
              enter-to-class="opacity-100 mt-0"
              leave-class="opacity-100 mt-0"
              leave-to-class="opacity-0 mt-6"
              mode="out-in"
            >
              <div
                v-show="isOpen"
                class="w-auto min-w-64 rounded-xl bg-white shadow-light_xl px-3 py-3"
              >
                <!-- My accounts   -->
                <Dropdown
                  v-if="employees && employees.length > 1"
                  placement="left-start"
                  arrow-class="border-white"
                  content-class="z-20"
                >
                  <template #trigger>
                    <div
                      class="flex cursor-pointer items-center  px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300"
                    >
                      <span>
                        {{ $tc('myAccounts') }}
                      </span>
                    </div>
                  </template>

                  <template #content="{isOpen:accountsOpen}">
                    <transition
                      enter-active-class="transition-all transition-slow ease-out overflow-hidden"
                      leave-active-class="transition-all transition-slow ease-in overflow-hidden"
                      enter-class="opacity-0 mr-6"
                      enter-to-class="opacity-100 mr-0"
                      leave-class="opacity-100 mr-0"
                      leave-to-class="opacity-0 mr-6"
                      mode="out-in"
                    >
                      <div
                        v-show="accountsOpen"
                        class="w-80 rounded-xl bg-white shadow-md p-3 transition-all duration-300 mr-2"
                      >
                        <div
                          v-for="(employee, index) in employees"
                          :key="index"
                        >
                          <div
                            class="flex items-center space-x-2 px-4 first:rounded-t-xl last:rounded-b-xl"
                            :class="{
                              'bg-aux-100':
                                currentEmployee.id ===
                                employee.id,
                              'hover:bg-neutral-50':
                                currentEmployee.id !==
                                employee.id,
                            }"
                          >
                            <div class="w-3">
                              <Tooltip
                                v-if="!employee.adviser"
                                :title="$tc('favAccount')"
                              >
                                <span
                                  class="cursor-pointer"
                                  @click="
                                    updateFavAccount(
                                      employee,
                                    )
                                  "
                                >
                                  <Icon
                                    name="icon-star"
                                    class="hover:text-aux-200"
                                    :class="
                                      employee.favorite
                                        ? 'text-font-link'
                                        : 'text-neutral-300'
                                    "
                                  />
                                </span>
                              </Tooltip>
                            </div>

                            <div
                              :id="employee.id"
                              class="border-b flex cursor-pointer items-center py-3 px-4"
                              :class="{
                                'pointer-events-none':
                                  currentEmployee.id ===
                                  employee.id,
                              }"
                              @click="
                                changeEmployee(employee)
                              "
                            >
                              <div
                                class="mr-4 flex items-center space-x-2"
                              >
                                <UserAvatar
                                  class="h-10 w-10 min-w-10 text-xs"
                                  :src="
                                    employee.imageProfileURL
                                  "
                                  :username="
                                    employee.firstName
                                      ? `${employee.firstName} ${employee.lastName}`
                                      : `${employee.adviser.firstName} ${employee.adviser.lastName}`
                                  "
                                  :employee="employee"
                                />
                              </div>
                              <div
                                class="flex flex-col text-sm font-semibold"
                              >
                                <template
                                  v-if="
                                    employee.myCompany
                                  "
                                >
                                  {{
                                    employee.myCompany
                                      .name
                                  }}
                                </template>
                                <template
                                  v-if="employee.adviser"
                                >
                                  Consultoría
                                </template>
                                <span class="font-normal">
                                  <template
                                    v-if="
                                      employee.firstName
                                    "
                                  >{{
                                    `${employee.firstName} ${employee.lastName}`
                                  }}</template>
                                  <template
                                    v-if="
                                      employee.adviser
                                    "
                                  >{{
                                    employee.adviser
                                      .fullName
                                  }}</template>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </template>
                </Dropdown>

                <!-- One account -->
                <div
                  v-else
                  id="click-admin-header-user-avatar"
                  class="flex cursor-pointer items-center px-8 py-4"
                  @click="changeToSignings"
                >
                  <UserAvatar
                    class="mr-4 h-12 w-12 text-xs"
                    :src="employee.imageProfileURL"
                    :username="`${employee.firstName} ${employee.lastName}`"
                    :employee="employee"
                  />
                  <EmployeeClockings
                    v-slot="{ time: currentTime }"
                    :current-employee="employee"
                  >
                    <p class="truncate text-xs text-font-secondary flex flex-col">
                      {{ $tc('hoursToday') }}
                      <span class="text-font-primary font-bold text-sm">
                        {{ currentTime }}
                      </span>
                    </p>
                  </EmployeeClockings>
                </div>

                <!-- Admin/User view -->
                <div
                  v-if="canBeAdmin"
                  :id="componentID"
                  class="flex cursor-pointer items-center  px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300"
                  @click="setAdminMetadata()"
                >
                  <p>
                    {{ $filters.capitalize(changeViewText) }}
                  </p>
                </div>

                <!-- My profile -->
                <div
                  v-if="!isSubscriptionCancelled"
                  @click="close"
                >
                  <router-link
                    v-if="!isAdmin"
                    id="click-admin-header-my-profile"
                    :to="{
                      name: 'user_profile',
                      params: { id: currentEmployee.id },
                    }"
                    tag="div"
                    class="flex cursor-pointer items-center  px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300"
                  >
                    <p>{{ $filters.capitalize($tc('myProfile')) }}</p>
                  </router-link>

                  <router-link
                    v-else
                    id="click-admin-header-user-profile"
                    :to="{
                      name: 'user-profile',
                      params: { id: currentEmployee.id },
                    }"
                    tag="div"
                    class="flex cursor-pointer items-center  px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300"
                  >
                    <p>
                      {{ $filters.capitalize($tc('myProfile')) }}
                    </p>
                  </router-link>
                </div>

                <SigningsCreateButton
                  v-if="canSignInWithoutSection"
                  :employee-id="employee.id"
                  :is-request="true"
                  :auto-manage-user="!isAdmin && canAutoCheck"
                >
                  <template #modal-trigger>
                    <button
                      type="button"
                      class="flex cursor-pointer items-center  px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300 w-full"
                    >
                      {{ $filters.capitalize($tc('addCheckinRequest')) }}
                    </button>
                  </template>
                </SigningsCreateButton>
                <!-- Plan & price -->
                <div
                  v-if="!isReseller && hasWritePermissionsPlan && isForbiddenOrigin"
                  id="click-admin-header-plans-and-prices"
                  class="flex cursor-pointer items-center px-4 py-3 mb-2 text-sm hover:bg-neutral-50 rounded-14px hover:text-font-link transition-all duration-300"
                  @click="onClickPlansPrices(close)"
                >
                  <p class="first-letter:uppercase">
                    {{ $tc('plansAndPrices') }}
                  </p>
                </div>
                <PlansPrices
                  v-if="!isReseller && hasWritePermissionsPlan && isForbiddenOrigin"
                  ref="plansPricesHeaderRef"
                />
                <!-- Logout -->
                <div
                  id="click-admin-header-logout"
                  class="flex cursor-pointer items-center  px-4 py-3 text-sm hover:bg-neutral-50 rounded-14px text-feedback-error transition-all duration-300"
                  :class="{ 'opacity-50': loading }"
                  @click="logout"
                >
                  {{ $filters.capitalize($tc('logout')) }}
                </div>
              </div>
            </transition>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeClockings from '@/components/employee-clockings/EmployeeClockings.vue';
import TimeTracker from '@/components/time-tracker/TimeTracker.vue';
import Finder from '@/modules/finder/Finder.vue';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import UserAvatar from '@/components/user-avatar/UserAvatar.vue';
import { notify } from '@/components-v2/HrNotifications/index.js';

import Auth from '@/api/models/Auth.js';
import EventBus from '@/utils/eventBus.js';
import { SUBSCRIPTION_STATUS, SUBSCRIPTIONS } from '@/config/constants.js';

import { mutations, state } from '@/store/store.js';
import { impersonateIfCompanyNotInAccessibleCompanies } from '@/services/Impersonator.js';
import Permissions from '@/components/permissions/Permissions.vue';
import Tooltip from '@/components/tooltip/Tooltip.vue';
import CompanyFavorite from '@/api/models/company/CompanyFavorite.js';
import PlansPrices from '@/modules/plans-prices/PlansPrices.vue';
import HrButton from '@/components-v2/HrButton/HrButton.vue';
import { sesameStorage } from '@/utils/helpers.js';
import { HIGHER_ROLES, LOWER_ROLES, NEW_CUSTOM_ROLES, ROLE } from '@/utils/constants/roles.js';
import HrAvatar from '@/components-v2/HrAvatar/HrAvatar.vue';
import SigningsCreateButton from '@/modules/signings/buttons/SigningsCreateButton.vue';
import {
    validateCanWriteRolePermission,
    validateCountries,
    validateInRoles,
    validatePermissionVisibilities,
} from '@/router/permissions-validators.js';
import { useRolePermissions } from '@/components/permissions/useRolePermissions.js';
import { validatePermissionPlanPrices } from '@/utils/sesame-utils.js';
import { isNotVodafoneOrigin, isNotCaixaBankOrigin } from '@/router/validators.js';

export default {
    name: 'AdminHeader',
    components: {
        HrAvatar,
        SigningsCreateButton,
        PlansPrices,
        Tooltip,
        Permissions,
        TimeTracker,
        Finder,
        Dropdown,
        UserAvatar,
        EmployeeClockings,
        HrButton,
    },
    data () {
        return {
            open: false,
            settings: false,
            loading: false,
        };
    },
    computed: {
        showNewMenu () {
            return sesameStorage.getItem('showNewMenu');
        },
        isPanelView () {
            return state.isAdminPanelActive;
        },
        employees () {
            return state?.employees;
        },
        currentEmployee () {
            return state?.employee;
        },

        subscriptionStatus () {
            return (
                this.currentEmployee && this.currentEmployee.subscriptionStatus
            );
        },
        isSubscriptionCancelled () {
            return (
                this.subscriptionStatus &&
                this.subscriptionStatus === SUBSCRIPTION_STATUS.CANCELLED
            );
        },
        canBeAdmin () {
            return [...HIGHER_ROLES, ...LOWER_ROLES, ROLE.ABSENCES_MANAGER].includes(this.currentEmployee.highestRoleType) && this.currentEmployee.accessibleCompanies.length && !this.isSubscriptionCancelled;
        },
        isAdmin () {
            return state?.isAdmin;
        },
        isSuperAdmin () {
            return state.employee.isSuperAdmin;
        },
        isCustomRole () {
            return validateInRoles(NEW_CUSTOM_ROLES) && !this.isSuperAdmin;
        },
        canAutoCheck () {
            return state.employee.configurations.EmployeeSelfManagementCheck;
        },
        employee () {
            return state.employee;
        },
        isReseller () {
            return state.employee?.company.isResellerCompany;
        },
        componentID () {
            if (this.isAdmin) {
                return 'click-admin-header-change-to-employee-view';
            } else {
                return 'click-admin-header-change-to-admin-view';
            }
        },
        changeViewText () {
            if (this.showNewMenu) {
                return this.$t(this.isPanelView ? 'userView' : 'adminView');
            }
            return this.$t(this.isAdmin ? 'userView' : 'adminView');
        },
        isDigitalClockActive () {
            return validatePermissionVisibilities(['digitalClock']) && validateCountries(['BR']);
        },
        canSignInWithoutSection () {
            return !validatePermissionVisibilities(['signings']) && validatePermissionVisibilities(['canSignInWithoutSection']);
        },
        isGroupVisible () {
            if (!this.employee) {
                return false;
            }
            const { group } = this.employee;
            const isGroupVisible = group && group.visible;

            return isGroupVisible;
        },
        permissions () {
            return useRolePermissions('PLANSANDPRICES');
        },
        hasWritePermissionsPlan () {
            return validateCanWriteRolePermission(this.permissions);
        },
        isForbiddenOrigin () {
            return isNotVodafoneOrigin() && isNotCaixaBankOrigin();
        },
    },
    methods: {
        validatePermissionPlanPrices,
        sendGTMEvent () {
            this.$gtmDataLayer({
                event_name: 'Plans Pricing Opened',
                event_name_ga: 'plans_pricing_opened',
                extraData: {
                    user_route: this.isAdmin ? 'admin-view' : 'employee-view',
                    platform: 'web-app',
                },
            });
        },
        setAdmin (isAdminView) {
            mutations.setAdmin(isAdminView, (this.employees?.length ?? 0) > 1);
            mutations.setAdminPanelActive(isAdminView);

            if (state.USID) {
                return;
            }

            impersonateIfCompanyNotInAccessibleCompanies();
        },
        async setAdminMetadata () {
            const state = this.showNewMenu ? !this.isPanelView : !this.isAdmin;

            this.setAdmin(state);
            await mutations.refreshMe();
            if (state) {
                this.$router.push({ name: 'admin' }).catch(() => ({}));
                // emitEvent('interaction', 'global', 'switch_to_admin_view');
            } else {
                if (this.isGroupVisible) {
                    mutations.setGSID(null);
                }
                this.$router.push({ name: 'user' }).catch(() => ({}));
                // emitEvent('interaction', 'global', 'switch_to_employee_view');
                EventBus.emit('sidebarLayoutDeactivate');
            }

            this.sendGTMEventViewChanged();
        },

        sendGTMEventViewChanged () {
            this.$gtmDataLayer({
                event_name: 'User View Changed',
                event_name_ga: 'user_view_changed',
                extraData: {
                    new_view: this.isAdmin ? 'admin' : 'employee',
                    platform: 'web-app',
                },
            });
        },

        async logout () {
            try {
                this.loading = true;
                await Auth.logout();
                await this.$router.push({ name: 'login' }).catch(() => ({}));
            } catch (error) {
                notify({
                    title: 'Logout',
                    text: error,
                });
            } finally {
                this.loading = false;
            }
        },
        async changeEmployee (employee) {
            if (employee.adviser) {
                mutations.setAdviserUser(employee, null, 'sesame');
                this.$router.push({ name: 'adviser' }).catch(() => ({}));
            } else {
                await this.setEmployee(employee);
                this.$router.push({ path: '/' }).catch(() => { });
                EventBus.emit('changedEmployee');
            }
        },
        async setEmployee (selectedEmployee) {
            mutations.setESID(selectedEmployee.id);
            mutations.setCSID(selectedEmployee.myCompany?.id);

            const employees = await Auth.me();
            const employeeFresh = employees.find(employee => employee.id === selectedEmployee.id);

            mutations.setEmployee(employeeFresh, selectedEmployee.myCompany?.id);

            mutations.setAdmin(this.isAdmin, true);
        },
        changeToSignings () {
            const companyModules = state.companyModules;
            const isCheckModuleUninstalled = companyModules.check === SUBSCRIPTIONS.NOT_INSTALLED;
            const isScheduleModuleUninstalled = companyModules.schedule === SUBSCRIPTIONS.NOT_INSTALLED;
            const adminProfileRoute = { name: 'employee', params: { id: this.currentEmployee.id } };

            if (this.isAdmin) {
                this.$router.push(isCheckModuleUninstalled ? adminProfileRoute : { name: 'employees-signings' });
            } else if (state.permissions.employee_view_signings && !isCheckModuleUninstalled) {
                this.$router.push({ name: 'user_signings' });
            } else {
                this.$router.push({ name: isScheduleModuleUninstalled ? 'personal_data' : 'user_schedules' });
            }
        },
        async updateEmployeeFav (employee) {
            await this.changeEmployee(employee);
        },
        async updateFavAccount (employeeSelected) {
            await new CompanyFavorite({ id: employeeSelected.id }).update();
            await this.updateEmployeeFav(employeeSelected);
        },
        onClickPlansPrices (close) {
            this.sendGTMEvent();
            close();
            this.$refs.plansPricesHeaderRef?.open();
        },
    },
};

</script>
<style scoped>
@media only screen and (min-width: 1441px) {
    .headerProfileName {
        display: block;
    }
}
</style>
