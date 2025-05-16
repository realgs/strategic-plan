<template>
  <div class="flex flex-col gap-2 pt-8">
    <div class="flex flex-col gap-2">
      <SideMenuSection title="payroll.period">
        <template #extraItem>
          <PayrollPeriodPicker />
          <DateFilterPayroll />
        </template>
      </SideMenuSection>
      <SideMenuSection
        :title="'process'"
        :section="PAYROLL_GENERATION_NEW"
      />
      <SideMenuSection
        :title="'contactInformation'"
        :section="SIDEBAR_ITEMS"
      />
      <SideMenuSection
        :title="'contract'"
        :section="CONTRACT_TABLES"
      />
      <SideMenuSection
        :title="'validations'"
        :section="PAYROLL_TABLES"
      />
    </div>
  </div>
</template>

<script setup>
import SideMenuSection from '@/modules/heroes/sidebar/components/SideMenuSection.vue';
import PayrollPeriodPicker from '@/modules/heroes/sidebar/components/PayrollSideMenuRoutes/PayrollPeriodPicker.vue';
import DateFilterPayroll from '@/pages/admin/payroll/components/DateFilterPayroll.vue';

const PAYROLL_GENERATION_NEW = [
    { label: 'payroll.generation', path: 'adviser-generation' },
    { label: 'split-payrolls', path: 'adviser-split-payrolls' },
];

const SIDEBAR_ITEMS = [
    {
        label: 'consultCenter',
        path: 'inquiry-center',
    },
    {
        label: 'payroll.sharedFolder',
        path: 'adviser-payroll-directories',
    },
];

const PAYROLL_TABLES = [
    {
        label: 'payroll.salaryUpgrade',
        path: 'adviser-salary-upgrades',
    },
    {
        label: 'payroll.absences',
        path: 'adviser-absences-payroll',
    },
    {
        label: 'payroll.advancesLoansLiens',
        path: 'adviser-advances-loans-liens-payroll',
    },
    {
        label: 'payroll.flexibleRemuneration',
        path: 'adviser-flexible-remuneration-payroll',
    },
    {
        label: 'payroll.benefits',
        path: 'adviser-benefits-payroll',
    },
    {
        label: 'payroll.conceptsAndVariables',
        path: 'adviser-benefits-complements',
    },
];

const CONTRACT_TABLES = [
    {
        label: 'registrationLeaves',
        path: 'adviser-registration-leaves',
    },
];
</script>
