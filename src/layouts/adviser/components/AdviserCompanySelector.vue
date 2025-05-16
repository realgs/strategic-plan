<template>
  <div>
    <InputField
      :label="$filters.capitalize($tc('selectCompany'))"
    >
      <SearchSelectAdvanced
        :value="localValue"
        :options="options"
        :show-search="false"
        :dropdown="{ strategy: 'absolute' }"
        :can-set-null-option="false"
        @input="onCompanyChange"
      />
    </InputField>
  </div>
</template>

<script setup>
import InputField from '@/components/input-field/InputField.vue';
import SearchSelectAdvanced from '@/components/search-select-advanced/SearchSelectAdvanced.vue';
import { state, mutations } from '@/store/store.js';
import capitalize from '@/filters/capitalize.js';
import EventBus from '@/utils/eventBus.js';
import { computed, onMounted, ref } from 'vue';

const companies = computed(() => state.adviser.companies);

const localValue = ref({ id: null });

onMounted(() => {
    const companyId = state.CSID ?? state.lastLoggedCompanyId;
    const companyIds = companies.value.map(x => x.id);
    if (companyIds.includes(companyId)) {
        localValue.value = { id: companyId };
    } else {
        localValue.value = { id: companyIds[0] };
    }
});

const options = computed(() => companies.value.map(company => ({ id: company.id, label: capitalize(company.name) })));

function onCompanyChange (value) {
    localValue.value = value;
    mutations.setAdviserUser(state.adviser, value.id, 'selector');
    EventBus.emit('impersonatorChange');
    EventBus.emit('contractsRefresh');
    EventBus.emit('directoriesRefresh');
    EventBus.emit('employeeLeaveRefresh');
    EventBus.emit('payrollPeriodsRefresh');
}
</script>
