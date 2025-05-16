<template>
  <Action
    v-slot="{ trigger }"
    v-bind="actionRejectProps"
    @done="onDone"
  >
    <div
      class="p-1 bg-feedback-error rounded-lg flex justify-center items-center cursor-pointer"
      @click="trigger"
    >
      <Icon
        name="icon-close"
        class="text-neutral-1"
      />
    </div>
  </Action>
</template>

<script>
import Action from '@/components/data-provider/Action.vue';
import DeclineAdviserCompany from '@/api/models/adviser/DeclineAdviserCompany.js';

export default {
    name: 'AdviserPendingRequestsDecline',
    components: { Action },
    props: {
        id: {
            type: String,
            required: true,
        },
        companyId: {
            type: String,
            required: true,
        },
    },
    computed: {
        actionRejectProps () {
            return {
                model: DeclineAdviserCompany,
                action: 'create',
                form: { companyId: this.companyId },
                config: {
                    adviserCompanyId: this.id,
                },
            };
        },
    },
    methods: {
        onDone () {
            this.$emit('onDone');
        },
    },
};
</script>
