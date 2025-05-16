<template>
  <Paginate
    v-bind="paginateInvitationProps"
    ref="paginateInvitations"
    v-model="invitations"
  >
    <div
      v-if="invitations.length > 0"
      class="mb-8"
    >
      <p class="mb-4 text-sm text-neutral-400">
        {{ $tc('advisorsPendingRequests', invitations.length) }}
      </p>
      <div
        v-for="(item, index) in invitations"
        v-show="index < 3 || showAllInvitations"
        :key="index"
        class="flex justify-between items-center mb-2"
      >
        <div
          v-if="!loadingInvitations"
          class="flex justify-between items-center w-full"
        >
          <p class="text-lg truncate">
            {{ $filters.capitalize(item.company.name) }}
          </p>
          <div
            class="flex gap-2"
          >
            <AdviserPendingRequestsAccept
              :id="item.id"
              :company-id="item.company.id"
              @onDone="acceptReloadMe"
            />
            <AdviserPendingRequestsDecline
              :id="item.id"
              :company-id="item.company.id"
              @onDone="reloadMe"
            />
          </div>
        </div>
        <div
          v-else
          class="flex justify-center items-center w-full"
        >
          <LoadingSpinnerHr :size="20" />
        </div>
      </div>
      <div
        v-if="invitations.length > 3"
        class="flex justify-center"
      >
        <Icon
          v-show="!showAllInvitations"
          name="icon-chevron-down"
          class="cursor-pointer"
          @click="changeVisibilityItemsInvitations"
        />
        <Icon
          v-show="showAllInvitations"
          name="icon-chevron-up"
          class="cursor-pointer"
          @click="changeVisibilityItemsInvitations"
        />
      </div>
      <hr>
    </div>
  </Paginate>
</template>

<script>
import Paginate from '@/components/data-provider/Paginate.vue';
import { mutations, state } from '@/store/store.js';
import AdviserCompaniesModel from '@/api/models/adviser/Company';
import AdviserPendingRequestsAccept from '@/layouts/adviser/components/AdviserPendingRequestsAccept.vue';
import AdviserPendingRequestsDecline from '@/layouts/adviser/components/AdviserPendingRequestsDecline.vue';
import { Auth } from '@/api/models';
import EventBus from '@/utils/eventBus';
import LoadingSpinnerHr from '@/components/loading-spinner-hr/LoadingSpinnerHr.vue';

export default {
    name: 'AdviserPendingRequests',
    components: {
        LoadingSpinnerHr,
        AdviserPendingRequestsDecline,
        AdviserPendingRequestsAccept,
        Paginate,
    },
    data () {
        return {
            showAllInvitations: false,
            invitations: [],
            loadingInvitations: false,
        };
    },
    computed: {
        paginateInvitationProps () {
            return {
                model: AdviserCompaniesModel,
                query: {
                    status: 'pending',
                },
                config: {
                    adviserId: state.adviser.adviser.id,
                },
            };
        },
    },
    methods: {
        async reloadMe () {
            this.loadingInvitations = true;
            setTimeout(async () => {
                const employees = await Auth.me();
                mutations.setEmployees(employees);
                await this.$refs.paginateInvitations.paginate();
                this.loadingInvitations = false;
            }, 2000);
        },
        async acceptReloadMe () {
            await this.reloadMe();
            EventBus.emit('companyChanged');
        },
        changeVisibilityItemsInvitations () {
            this.showAllInvitations = !this.showAllInvitations;
        },
    },
};
</script>
