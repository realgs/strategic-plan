<template>
  <div
    v-if="currentEmployee"
    class="m-auto overflow-hidden relative"
  >
    <!--==================== BANNERS ====================-->
    <BannerSection @showBanner="setShowBanner" />

    <!--  PENDING INVOICES BANNER  -->
    <Permissions :roles="[ROLE.OWNER, ROLE.ADMIN]">
      <PendingInvoicesBanner />
    </Permissions>
    <!-- END PENDING INVOICES BANNER  -->
    <!--================== END BANNERS ==================-->

    <div
      class="flex h-full lg:flex-row relative"
      :class="{ 'pt-14': showBanner }"
    >
      <LateralSidebar class="z-50" />
      <HrSidebar v-if="showNewMenu" />
      <HeroSidebar v-if="!showNewMenu" />
      <div
        id="layout-area"
        ref="container"
        class="main-container relative min-h-0 flex-1 overflow-y-auto bg-neutral-50"
      >
        <div
          class="z-30 mt-2.75 mr-8"
          :class="[isHeaderSmall ? 'w-fit-content ml-auto' : 'absolute top-0 right-0', { hidden: isAdminEmployeeView }]"
        >
          <LayoutHeader ref="layoutHeader" />
        </div>

        <router-view />
      </div>
      <Permissions
        v-if="showAI || showCalendar"
        :roles="HIGHER_ROLES"
        class="relative"
      >
        <component :is="Rightbar" />
      </Permissions>
    </div>
    <OnboardingDemoData v-if="showOnboarding" />
    <AppOnboardingNew v-if="showOnboardingAppsModal" />
  </div>
</template>

<script>
import LayoutHeader from './Header.vue';

import { state, mutations } from '@/store/store.js';

import { GROUPS, COMPANIES_ORIGIN } from '@/config/constants.js';

import Permissions from '@/components/permissions/Permissions.vue';
import LateralSidebar from '@/modules/heroes/sidebar/LateralSidebar.vue';
import { HIGHER_ROLES, ROLE } from '@/utils/constants/roles.js';
import EventBus from '@/utils/eventBus.js';
import PendingInvoicesBanner from '@/components/pending-invoices-banner/PendingInvoicesBanner.vue';
import HrSidebar from '@/modules/sidebar/HrSidebar.vue';
import BannerSection from '@/components/app-banner/BannerSection.vue';
import HeroSidebar from '@/modules/heroes/sidebar/Sidebar.vue';
import { sesameStorage, sesameSessionStorage, setTheme, debounce } from '@/utils/helpers.js';

import OnboardingDemoData from '@/modules/app-onboarding-new/OnboardingDemoData.vue';
import AppOnboardingNew from '@/modules/app-onboarding-new/OnboardingApps.vue';
import { validateAddOn, validateCompanyModuleInstalled } from '@/router/permissions-validators.js';
import { notify } from '@/components-v2/HrNotifications/index.js';
import { useSocket } from '@/sockets/useSocket.js';

const MIN_FREE_SPACE_IN_HEADER = 80;

export default {
    name: 'AppLayout',
    components: {
        BannerSection,
        HrSidebar,
        PendingInvoicesBanner,
        Permissions,
        LateralSidebar,
        LayoutHeader,
        OnboardingDemoData,
        HeroSidebar,
        AppOnboardingNew,
    },
    setup () {
        const { socket } = useSocket();
        return { socket };
    },
    data () {
        return {
            HIGHER_ROLES,
            ROLE,
            GROUPS,
            showBanner: false,
            resizeObserver: null,
            layoutAreaWidth: 1920,
            layoutHeaderWidth: 0,
            layoutTitleWidth: 0,
        };
    },
    computed: {
        Rightbar () {
            if (this.showAI || this.showCalendar) return () => import('@/modules/heroes/rightbar/Rightbar.vue');
            return undefined;
        },
        showAI () {
            const isAiActive = validateAddOn('v2-ia-addon') || validateCompanyModuleInstalled('ai');
            return this.isAdminView && isAiActive;
        },
        showCalendar () {
            return this.isAdminView && this.isArtVisualGroup;
        },
        showNewMenu () {
            return sesameStorage.getItem('showNewMenu');
        },
        isHigherRole () {
            return [ROLE.OWNER, ROLE.ADMIN, ROLE.HR].includes(state.employee?.highestRoleType) || state.employee?.isSuperAdmin;
        },
        currentEmployee () {
            return state.employee;
        },
        isAdminEmployeeView () {
            return !!this.$route.matched.find((x) => x.name === 'employee');
        },
        isAdminView () {
            return state?.isAdmin;
        },
        showOnboarding () {
            const showOnboardingCookie = sesameSessionStorage.getItem('showOnboarding') || false;
            return this.isAdminView && (state.showOnboarding || showOnboardingCookie);
        },
        showOnboardingAppsModal () {
            return this.isAdminView && (state.showOnboardingApps);
        },
        isArtVisualGroup () {
            return state.employee?.group?.id === GROUPS.ARTVISUAL;
        },
        isVodaFone () {
            return state.employee?.myCompany?.origin === COMPANIES_ORIGIN.VODAFONE;
        },
        isHeaderSmall () {
            return (this.layoutAreaWidth - this.layoutHeaderWidth - this.layoutTitleWidth) < MIN_FREE_SPACE_IN_HEADER;
        },
    },
    watch: {
        isVodaFone: {
            immediate: true,
            handler (newValue) {
                setTheme(newValue ? 'vodafone' : 'sesame');
            },
        },
        currentEmployee: {
            immediate: !this?.resizeObserver,
            handler () {
                this.$nextTick(() => {
                    if (this.$refs?.container) {
                        this.resizeObserver = new ResizeObserver(debounce(this.getElementsWidth, 200)).observe(this.$refs.container);
                    }
                });
            },
        },
    },
    created () {
        if (sesameStorage.getItem('showNewMenu') === null) {
            sesameStorage.setItem('showNewMenu', false);
        }

        mutations.setAdminPanelActive(this.isAdminView);

        EventBus.on('scrollTop', this.scrollTop);
        EventBus.on('scrollTo', this.scrollTo);
        this.socket.on('EmployeeTemplateImportUploaded', this.handleSocketEmployeeTemplateImportUploaded);
        this.socket.on('ContractDataImportUploaded', this.handleSocketContractDataImportUploaded);
        this.socket.on('CustomFieldsImportUploaded', this.handleSocketCustomFieldsImportUploaded);
    },
    beforeUnmount () {
        this.resizeObserver?.disconnect();
    },
    unmounted () {
        EventBus.off('scrollTop', this.scrollTop);
        EventBus.off('scrollTo', this.scrollTo);
        this.socket.off('EmployeeTemplateImportUploaded', this.handleSocketEmployeeTemplateImportUploaded);
        this.socket.off('ContractDataImportUploaded', this.handleSocketContractDataImportUploaded);
        this.socket.off('CustomFieldsImportUploaded', this.handleSocketCustomFieldsImportUploaded);
    },
    methods: {
        scrollTop () {
            this.$refs.container.scrollTop = 0;
        },
        scrollTo (position) {
            this.$refs.container.scrollTop = position;
        },
        setShowBanner (show) {
            this.showBanner = show;
        },
        getElementsWidth () {
            this.layoutAreaWidth = this.$refs.container?.offsetWidth || 1920;
            this.layoutHeaderWidth = this.$refs.layoutHeader?.$el?.offsetWidth || 0;
            this.layoutTitleWidth = document.getElementById('layout-title')?.offsetWidth || 0;
        },
        handleSocketEmployeeTemplateImportUploaded (employeesCount) {
            notify({
                type: 'success',
                title: this.$t('FormacionesSuccess.Genial'),
                text: this.$tc('EmployeeTemplateImportUploaded', 1, { n: employeesCount }),
            });
        },
        handleSocketContractDataImportUploaded () {
            notify({
                type: 'success',
                title: this.$t('FormacionesSuccess.Genial'),
                text: this.$t('ContractDataImportUploaded'),
            });
        },
        handleSocketCustomFieldsImportUploaded () {
            notify({
                type: 'success',
                title: this.$t('FormacionesSuccess.Genial'),
                text: this.$t('CustomFieldsImportUploaded'),
            });
        },
    },
};
</script>
