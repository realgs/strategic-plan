<template>
  <Action
    v-slot="{ trigger, errors }"
    v-bind="UpdateActionProps"
    @done="comeBack"
  >
    <div class="flex flex-col gap-y-2">
      <div class="flex w-min mb-2">
        <HrButton
          appearance="link"
          class="p-0"
          icon="icon-chevron-left"
          icon-left
          @click="comeBack"
        >
          {{ $t('back') }}
        </HrButton>
      </div>
      <InputField
        :label="$filters.capitalize($tc('firstName'))"
        :errors="errors"
        error-target="firstName"
        rules="required|min=1"
      >
        <input
          v-model="form.firstName"
          v-focus
          type="text"
          class="form-input w-68 rounded-lg"
        >
      </InputField>
      <InputField
        :label="$filters.capitalize($tc('lastName'))"
        :errors="errors"
        error-target="lastName"
        rules="required|min=1"
      >
        <input
          v-model="form.lastName"
          type="text"
          class="form-input w-68 rounded-lg"
        >
      </InputField>
      <InputField
        :label="$filters.capitalize($tc('phone'))"
        :errors="errors"
        error-target="phone"
      >
        <input
          v-model="form.phone"
          type="text"
          class="form-input w-68 rounded-lg"
        >
      </InputField>
      <InputField
        :label="$filters.capitalize($tc('email'))"
        :errors="errors"
        error-target="lastName"
        :disable-switch="true"
      >
        <input
          v-model="form.email"
          type="text"
          class="form-input w-68 rounded-lg bg-neutral-200"
          readonly
          disabled
        >
      </InputField>
      <InputField
        :label="$filters.capitalize($tc('language'))"
        :errors="errors"
        error-target="language"
      >
        <LanguageSelector v-model="form.language" />
      </InputField>
      <InputField
        :label="$filters.capitalize($tc('adviserCompanyName'))"
        :errors="errors"
        error-target="lastName"
        rules="required|min=1"
      >
        <input
          v-model="form.companyName"
          type="text"
          class="form-input w-68 rounded-lg"
        >
      </InputField>
      <HrButton @click="trigger">
        {{ $filters.capitalize($t('save')) }}
      </HrButton>
    </div>
  </Action>
</template>

<script>
import HrButton from '@/components-v2/HrButton/HrButton.vue';
import InputField from '@/components/input-field/InputField.vue';
import Action from '@/components/data-provider/Action.vue';
import UpdateProfileAdviser from '@/api/models/adviser/UpdateProfileAdviser';
import LanguageSelector from '@/components/language-selector/LanguageSelector.vue';
import { Auth } from '@/api/models';
import { mutations } from '@/store/store.js';

export default {
    name: 'AdviserRoleUserMenuConfiguration',
    components: { LanguageSelector, Action, InputField, HrButton },
    props: {
        adviser: {
            type: Object,
        },
    },
    data () {
        return {
            languages: [],
            form: {
                firstName: this.adviser.adviser.firstName,
                lastName: this.adviser.adviser.lastName,
                phone: this.adviser.adviser.phone ? this.adviser.adviser.phone : '',
                email: this.adviser.adviser.email,
                language: this.adviser.adviser.language,
                companyName: this.adviser.adviser.companyName,
            },
        };
    },
    computed: {
        UpdateActionProps () {
            return {
                model: UpdateProfileAdviser,
                action: 'create',
                form: { ...this.form },
            };
        },
    },
    methods: {
        async comeBack () {
            await this.updateMe();
            this.$emit('comeBack');
        },
        async updateMe () {
            const employees = await Auth.me();
            mutations.setEmployees(employees);
        },
    },
};
</script>
