<template>
  <div class="flex items-start justify-start">
    <HrModalFullScreenLeftSidebar
      :show.sync="showLeftSidebar"
      :width="180"
      class="h-full"
    >
      <template #default>
        <div
          v-for="section in filteredSections"
          :key="section"
          class="flex flex-col mt-6 first:mt-0"
        >
          <span class="text-font-tertiary font-bold text-xs px-4 py-2">
            {{ $tc(section).toUpperCase() }}
          </span>

          <router-link
            v-for="route in groupedRoutesBySection[section]"
            :key="route.name"
            :to="{ name: route.name}"
            class="flex items-center justify-start px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-background-50 active:bg-background-200"
            :class="$route.name === route.name ? 'text-font-link' : 'text-font-primary'"
          >
            <Icon
              :name="route?.meta?.icon || 'icon-check'"
              size="small"
              class="mr-2"
            />
            <span class="text-sm">
              {{ $filters.capitalize($tc(route.key)) }}
            </span>
          </router-link>
        </div>
      </template>
    </HrModalFullScreenLeftSidebar>
    <div
      v-if="!showLeftSidebar"
      class="p-1"
    >
      <Tooltip
        :title="$tc('expand')"
        placement="right"
      >
        <HrButton
          appearance="tertiary"
          icon="icon-layout-sidebar-left-expand"
          size="small"
          @click="openLeftSidebar"
        />
      </Tooltip>
    </div>
  </div>
</template>

<script>

import { getNestedRoutesAllowed } from '@/router/index.js';
import { ORDERED_SIDEBAR_SECTIONS } from './fullscreenConfigConstants.js';
import { groupBy } from '@/utils/helpers.js';
import { state } from '@/store/store.js';
import HrModalFullScreenLeftSidebar from '@/components/HrModalFullScreen/modules/HrModalFullScreenLeftSidebar.vue';
import Tooltip from '@/components/tooltip/Tooltip.vue';
import HrButton from '@/components-v2/HrButton/HrButton.vue';
import { hasAccessMetaValidatorRoles } from '@/router/permissions-meta-constants.js';

export default {
    name: 'ConfigSidebar',
    components: { HrButton, Tooltip, HrModalFullScreenLeftSidebar },
    props: {
        module: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            showLeftSidebar: true,
        };
    },
    computed: {
        routes () {
            return getNestedRoutesAllowed('config-fullscreen.config-fullscreen-module', hasAccessMetaValidatorRoles)
                .filter(route => {
                    const meta = route?.meta || {};
                    return meta.show !== false &&
                   meta.modulesVisibility?.includes(this.module) &&
                   (meta.roles?.includes(state.employee?.highestRoleType) || state.employee?.isSuperAdmin);
                });
        },
        filteredSections () {
            return ORDERED_SIDEBAR_SECTIONS.filter(section => this.routes.some(route => route?.meta?.configSection === section));
        },
        groupedRoutesBySection () {
            return groupBy(this.routes, route => route?.meta?.configSection);
        },
    },
    methods: {
        openLeftSidebar () {
            this.showLeftSidebar = true;
        },
    },
};
</script>
