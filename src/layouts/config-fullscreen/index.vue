<template>
  <transition
    appear
    enter-active-class="transition-all duration-300 ease-full overflow-hidden"
    leave-active-class="transition-all duration-300 ease-full overflow-hidden"
    enter-class="opacity-0 scale-75 "
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100 "
    leave-to-class="opacity-0 scale-75"
  >
    <div class="text-font-primary bg-white h-full flex flex-col">
      <div class="px-6 py-1 flex justify-between items-center border-b border-neutral-200">
        <span class="font-bold text-xl">
          {{ $tc('configurationOfSection', 0, {module: $tc(module).toLowerCase()}) }}
        </span>
        <Icon
          name="icon-close"
          class="cursor-pointer"
          @click.native="closeModal"
        />
      </div>
      <div class="flex h-full overflow-hidden">
        <ConfigSidebar :module="module" />
        <div class="w-full h-full flex flex-col overflow-hidden ">
          <div
            v-if="!hideModuleInfo"
            class="flex flex-col justify-start items-start p-6"
          >
            <span class="font-bold text-lg mb-3">
              {{ moduleInfo.title }}
            </span>
            <span class="text-font-secondary text-sm">
              {{ moduleInfo.description }}
            </span>
          </div>
          <div class="h-full overflow-y-auto pl-2 pr-6">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import ConfigSidebar from './ConfigSidebar.vue';

export default {
    name: 'ConfigFullscreenLayout',
    components: { ConfigSidebar },
    computed: {
        module () {
            return this.$route.params.module.toString();
        },
        moduleInfo () {
            const routeName = this.$route.meta.fromName || this.$route.name;
            return {
                title: this.$tc(`fullscreenConfig.${routeName}.title`),
                description: this.$tc(`fullscreenConfig.${routeName}.description`),
            };
        },
        hideModuleInfo () {
            return !!this.$route.meta.hideModuleInfo;
        },
    },
    methods: {
        closeModal () {
            this.$router.push({ name: this.module });
        },
    },
};
</script>
