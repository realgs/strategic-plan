<template>
  <div>
    <template v-if="adviser">
      <Paginate
        ref="paginatePeriodsRef"
        v-bind="paginatePeriodsProps"
        @load="onLoadPeriods"
      >
        <Paginate
          v-bind="paginatePayrollTimeline"
          ref="paginatePayrollTimelineRef"
          v-model="timelineDates"
          @load="saveTimelineDates"
        >
          <div
            v-if="hasLoadedPeriods"
            class="relative flex h-full w-full overflow-y-auto"
          >
            <SidebarAdviser />
            <div class="flex-1 relative h-full overflow-y-auto">
              <AdviserRoleUserMenu />
              <slot />
            </div>
          </div>
        </Paginate>
      </Paginate>
    </template>
  </div>
</template>

<script>
import SidebarAdviser from '@/layouts/adviser/Sidebar.vue';
import { mutations, state } from '@/store/store.js';
import EventBus from '@/utils/eventBus.js';
import AdviserRoleUserMenu from '@/layouts/adviser/components/AdviserRoleUserMenu.vue';
import Paginate from '@/components/data-provider/Paginate.vue';
import { usePayrollStore } from '@/stores/payroll.js';
import { computed, ref } from 'vue';
import PayrollGenerationPeriodModel from '@/api/models/payroll/generation/PayrollGenerationPeriodModel.js';
import TimelinePayrollModel from '@/api/models/payroll/dashboard/TimelinePayrollModel.js';

export default {
    name: 'AdviserLayout',
    components: { Paginate, AdviserRoleUserMenu, SidebarAdviser },
    setup () {
        const payrollStore = usePayrollStore();
        const paginatePayrollTimelineRef = ref(null);
        const loading = ref(true);
        const hasLoadedPeriods = ref(false);
        const timelineDates = ref({
            periodStart: '',
            periodEnd: '',
            periodType: 'monthly',
        });

        const saveTimelineDates = () => {
            payrollStore.setTimelineDates(timelineDates.value);
            payrollStore.setFilterDateFrom(timelineDates.value.periodStart);
            payrollStore.setFilterDateTo(timelineDates.value.periodEnd);
            hasLoadedPeriods.value = true;
        };

        const onLoadPeriods = async (periods) => {
            if (!periods || !periods.length) {
                hasLoadedPeriods.value = true;
                return;
            }
            payrollStore.setPeriods(periods);
            payrollStore.setDefaultPeriodAsSelected();
            await paginatePayrollTimelineRef.value.paginate();
        };

        const paginatePeriodsProps = computed(() => {
            return {
                model: PayrollGenerationPeriodModel,
                action: 'paginate',
            };
        });
        const paginatePayrollTimeline = computed(() => {
            return {
                model: TimelinePayrollModel,
                config: {
                    periodId: payrollStore.selectedPeriodId,
                },
                query: {
                    date: new Date(),
                },
            };
        });

        return {
            paginatePeriodsProps,
            onLoadPeriods,
            saveTimelineDates,
            timelineDates,
            paginatePayrollTimeline,
            paginatePayrollTimelineRef,
            loading,
            hasLoadedPeriods,
        };
    },
    computed: {
        employees () {
            return state.employees;
        },
        currentEmployee () {
            return state && state.employee;
        },
        adviser () {
            return state.adviser;
        },
    },
    methods: {
        async changeEmployee (employee) {
            await mutations.setEmployee(employee, employee.myCompany?.id);
            if (!employee.adviser) {
                this.$router.push({ name: 'home' });
            }
            EventBus.emit('changedEmployee');
        },
    },
};
</script>
