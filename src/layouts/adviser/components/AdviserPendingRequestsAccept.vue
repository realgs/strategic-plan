<template>
  <Action
    v-slot="{ trigger }"
    v-bind="actionAcceptProps"
    @done="onDone"
  >
    <div
      class="p-1 bg-feedback-success rounded-lg flex justify-center items-center cursor-pointer"
      @click="trigger"
    >
      <Icon
        name="icon-check"
        class="text-neutral-1"
      />
    </div>
  </Action>
</template>

<script>
import Action from '@/components/data-provider/Action.vue';
import AcceptAdviserCompany from '@/api/models/adviser/AcceptAdviserCompany.js';

export default {
    name: 'AdviserPendingRequestsAccept',
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
        actionAcceptProps () {
            return {
                model: AcceptAdviserCompany,
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
