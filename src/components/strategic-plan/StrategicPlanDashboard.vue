<template>
  <div class="strategic-plan-dashboard min-h-screen w-full relative"
       :class="{ 'overflow-hidden': isPresentationMode }">
    <!-- Presentation Mode -->
    <div
      class="min-h-screen w-full absolute inset-0 transition-all duration-300"
      :class="{
        'opacity-100 z-20': isPresentationMode,
        'opacity-0 pointer-events-none -z-10': !isPresentationMode
      }"
    >
      <div class="flex items-center justify-center min-h-screen">
        <div class="max-w-5xl p-6">
          <div
            class="bg-white rounded-xl p-4 sm:p-6 md:p-10 shadow-sm transition-all duration-500 transform"
          >
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
              Plan Estratégico LTI 2025
            </h1>
            <div class="h-[24px] mb-8">
              <div v-if="isPresentationMode" 
                   class="flex justify-center gap-2 animate-fade-in">
                <div v-for="i in 3" :key="i" 
                     class="w-2 h-2 rounded-full transition-all duration-300 relative"
                     :class="[
                       clickCount >= i ? 'bg-blue-600 scale-110' : 'bg-gray-200',
                       {'animate-ping-once': clickCount + 1 === i}
                     ]">
                </div>
              </div>
            </div>
            <div class="flex flex-col md:grid md:grid-cols-3 mt-4 gap-4 md:gap-8 max-w-[320px] md:max-w-none mx-auto md:mx-0">
              <div
                v-for="(stat, index) in stats"
                :key="stat.title"
                class="stats-card p-6 rounded-lg cursor-pointer transform transition-all duration-300 relative group"
                :class="[
                  stat.bgClass,
                  {
                    'scale-105': clickedIndexes.includes(index),
                    'hover:scale-105 hover:shadow-lg': !clickedIndexes.includes(index),
                    'animate-card-pulse': isPresentationMode && !clickedIndexes.includes(index),
                    'w-full': isPresentationMode,
                    'flex-shrink-0 w-[320px] snap-center': !isPresentationMode
                  }
                ]"
                @click="handleStatClick(index)"
              >
                <div
                  v-if="isPresentationMode && !clickedIndexes.includes(index)"
                  class="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-700 bg-opacity-90 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 tooltip-transition whitespace-nowrap shadow-lg"
                >
                  {{ getTooltipText(index) }}
                </div>
                <div class="relative z-10">
                  <p class="text-base sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-1 transition-all duration-300"
                    :class="{'scale-110 transform': clickedIndexes.includes(index)}">
                    {{ stat.title }}
                  </p>
                  <p
                    class="text-2xl sm:text-xl md:text-2xl font-bold transition-all duration-300"
                    :class="[
                      stat.textClass,
                      {'scale-110 transform': clickedIndexes.includes(index)}
                    ]"
                  >
                    {{ stat.value }} <span class="text-sm sm:text-xs md:text-sm">{{ stat.detail }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="h-[40px] mt-8">
              <p v-if="isPresentationMode && clickCount === 0" 
                 class="text-xs sm:text-sm md:text-base text-gray-500 text-center animate-text-pulse px-4 mx-auto max-w-[280px] sm:max-w-none">
                Haz click en las tarjetas para explorar el plan estratégico
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Content View -->
    <div
      class="w-full transition-all duration-1000 transform absolute inset-0"
      :class="{
        'opacity-0 translate-y-full pointer-events-none -z-10': isPresentationMode,
        'opacity-100 translate-y-0 z-10': !isPresentationMode
      }"
    >
      <!-- Rest of your content -->
      <div class="max-w-5xl mx-auto p-6 space-y-8">
        <!-- Header Section -->
        <div class="bg-white rounded-xl p-10 shadow-sm">
          <h1 class="text-3xl font-bold text-gray-800 text-center mb-12 flex items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
            Plan Estratégico LTI 2025
          </h1>
          <div class="flex flex-col md:flex-row justify-center mt-4 gap-4">
            <div
              v-for="(stat, index) in stats"
              :key="stat.title"
              class="stats-card p-6 rounded-lg"
              :class="stat.bgClass"
            >
              <div class="relative z-10">
                <p class="text-base text-gray-600">
                  {{ stat.title }}
                </p>
                <p
                  class="text-2xl font-bold"
                  :class="stat.textClass"
                >
                  {{ stat.value }} <span class="text-sm">{{ stat.detail }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quarterly Timeline -->
        <div
          ref="timelineSection"
          class="bg-white rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-500"
          :class="{ 'opacity-0 translate-y-10': !isTimelineVisible, 'opacity-100 translate-y-0': isTimelineVisible }"
        >
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            Objetivos Trimestrales
          </h2>
          <TransitionGroup
            name="quarters-fade"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full"
          >
            <div
              v-for="quarter in ['Q1', 'Q2', 'Q3', 'Q4']"
              :key="quarter"
              class="border rounded-lg p-3 sm:p-4 cursor-pointer transform transition-all duration-300 hover:shadow-lg w-full"
              :class="{ 'scale-[1.02]': selectedQuarter === quarter }"
              @click="selectQuarter(quarter)"
            >
              <h3 class="font-bold text-base sm:text-lg text-blue-600">
                {{ quarter }}
              </h3>
              <ul class="mt-2 space-y-2 text-[14px] sm:text-sm">
                <TransitionGroup name="list">
                  <li
                    v-for="(objective, idx) in quarterlyObjectives[quarter]"
                    :key="idx"
                    class="flex items-start"
                  >
                    <span class="w-2 h-2 mt-1.5 mr-2 bg-blue-400 rounded-full flex-shrink-0" />
                    <span class="flex-1">{{ objective }}</span>
                  </li>
                </TransitionGroup>
              </ul>
              <div class="mt-4 pt-4 border-t">
                <p class="text-[14px] font-semibold text-gray-700">
                  Milestone:
                </p>
                <p class="text-[14px] text-gray-600">
                  {{ quarterlyMilestones[quarter] }}
                </p>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- KPI Tracking -->
        <div
          ref="kpiSection"
          class="bg-white rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-500"
          :class="{ 'opacity-0 translate-y-10': !isKpiVisible, 'opacity-100 translate-y-0': isKpiVisible }"
        >
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            Indicadores Clave de Rendimiento
          </h2>
          <TransitionGroup
            name="kpi-fade"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          >
            <div
              v-for="(kpi, idx) in kpis"
              :key="idx"
              class="border rounded-lg p-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105 relative group"
            >
              <h3 class="font-semibold text-gray-700 flex items-center gap-2">
                {{ kpi.name }}
                <div v-if="kpi.name === 'CLTV'" class="hidden md:inline-flex items-center relative group/tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                       class="w-4 h-4 text-gray-500 cursor-help">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <div class="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-700 bg-opacity-90 text-white text-xs rounded-full opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
                    Customer Lifetime Value: Valor total que un cliente genera durante su relación con la empresa
                  </div>
                </div>
              </h3>
              <div class="mt-2">
                <div class="flex justify-between text-sm">
                  <span>Actual: {{ kpi.current }}</span>
                  <span>Objetivo: {{ kpi.target }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                  <div
                    class="h-2.5 rounded-full transition-all duration-1500 ease-out transform origin-left"
                    :class="[
                      'animate-pulse-subtle',
                      {
                        'from-blue-300 to-blue-700 bg-gradient-to-r': idx === 0,
                        'from-emerald-300 to-emerald-700 bg-gradient-to-r': idx === 1,
                        'from-violet-300 to-violet-700 bg-gradient-to-r': idx === 2
                      }
                    ]"
                    :style="{
                      width: kpiProgress[idx] + '%',
                      transform: `scaleX(${kpiProgress[idx] / 100})`
                    }"
                  />
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Budget Allocation -->
        <div
          ref="budgetSection"
          class="bg-white rounded-xl p-4 sm:p-6 shadow-sm"
          :class="{ 'opacity-0 translate-y-10': !isBudgetVisible, 'opacity-100 translate-y-0': isBudgetVisible }"
        >
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            Distribución del Presupuesto
          </h2>
          <div class="flex justify-center">
            <div class="w-full max-w-4xl space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <!-- Salarios Column -->
                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-800 border-b pb-2 flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 text-blue-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Salarios
                  </h3>
                  <div
                    v-for="(item, idx) in salaryItems"
                    :key="idx"
                    class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-sm transform hover:-translate-y-0.5 gap-2 sm:gap-0"
                  >
                    <div>
                      <span class="text-gray-700 font-medium text-sm sm:text-base">{{ item.name }}</span>
                      <span class="text-xs sm:text-sm text-gray-500 block">{{ item.details }}</span>
                    </div>
                    <span class="font-semibold text-blue-600 text-sm sm:text-base">{{ item.amount }}€</span>
                  </div>
                </div>

                <!-- Infrastructure Column -->
                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-800 border-b pb-2 flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 text-emerald-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                      />
                    </svg>
                    Infraestructura
                  </h3>
                  <div
                    v-for="(item, idx) in infrastructureItems"
                    :key="idx"
                    class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:shadow-sm transform hover:-translate-y-0.5 gap-2 sm:gap-0"
                  >
                    <span class="text-gray-700 font-medium text-sm sm:text-base">{{ item.name }}</span>
                    <span class="font-semibold text-emerald-600 text-sm sm:text-base">{{ item.amount }}€</span>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform transition-all duration-300 hover:scale-[1.02] gap-2 sm:gap-0">
                  <span class="font-bold flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    Contingencia
                  </span>
                  <span class="font-semibold text-green-600">44.000€</span>
                </div>
              </div>
              <div class="pt-4 border-t">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform transition-all duration-300 hover:scale-[1.02] gap-2 sm:gap-0">
                  <span class="font-bold flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.172-2.303 0-3.182C10.536 7.719 11.768 7.5 12 7.5c.725 0 1.45.22 2.003.659"
                      />
                    </svg>
                    TOTAL
                  </span>
                  <span class="font-bold">500.200€</span>
                </div>
                <div class="relative">
                  <div class="flex items-center justify-end gap-2 mt-5 sm:mt-7 bg-yellow-50 border border-yellow-200 rounded-lg p-2 pr-3 group hover:bg-yellow-100 transition-all duration-300 cursor-default">
                    <span class="text-xs sm:text-sm font-medium text-yellow-800 group-hover:text-yellow-900 transition-colors duration-300">
                      ¡Pago yo los 200€ que faltan!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Structure -->
        <div
          ref="teamSection"
          class="bg-white rounded-xl p-6 shadow-sm transition-all duration-500"
          :class="{ 'opacity-0 translate-y-10': !isTeamVisible, 'opacity-100 translate-y-0': isTeamVisible }"
        >
          <h2 class="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            Estructura del Equipo
          </h2>
          <TransitionGroup
            name="team-fade"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div
              v-for="(member, idx) in teamStructure"
              :key="idx"
              class="border rounded-lg p-4 cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <h3 class="font-semibold">
                {{ member.role }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                {{ member.description }}
              </p>
              <p class="text-sm font-semibold text-blue-600 mt-2">
                {{ member.compensation }}
              </p>
            </div>
          </TransitionGroup>
        </div>

        <!-- Risk Analysis -->
        <div
          ref="riskSection"
          class="bg-white rounded-xl p-6 shadow-sm transition-all duration-500"
          :class="{ 'opacity-0 translate-y-10': !isRiskVisible, 'opacity-100 translate-y-0': isRiskVisible }"
        >
          <h2 class="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            Análisis de Contingencia
          </h2>
          <TransitionGroup
            name="risk-fade"
            tag="div"
            class="space-y-4"
          >
            <div
              v-for="(risk, idx) in risks"
              :key="idx"
              class="border rounded-lg p-4 cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <h3 class="font-semibold text-gray-700">
                {{ risk.name }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                {{ risk.mitigation }}
              </p>
            </div>
          </TransitionGroup>
        </div>

        <!-- Sección Motivadora -->
        <div
          ref="motivationalSection"
          class="bg-white rounded-xl p-6 shadow-sm transition-all duration-500 mb-8"
          :class="{ 'opacity-0 translate-y-10': !isMotivationalVisible, 'opacity-100 translate-y-0': isMotivationalVisible }"
          data-section="motivational"
        >
          <h2 class="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            Nuestro Camino hacia el Éxito
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 overflow-hidden">
              <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Lo que hemos logrado juntos
              </h3>
              <ul class="space-y-2 text-blue-700">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Gracias a vuestro esfuerzo incansable, hemos construido una plataforma que está transformando la industria del reclutamiento</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Vuestra dedicación nos ha permitido conquistar mercados internacionales, demostrando que la excelencia no tiene fronteras</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Habéis creado una experiencia excepcional que nuestros clientes adoran, como demuestran nuestras increíbles tasas de retención</span>
                </li>
              </ul>
              <div class="mt-6 -mx-6 -mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                  alt="Equipo celebrando con champán"
                  class="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 overflow-hidden">
              <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                A dónde vamos
              </h3>
              <ul class="space-y-2 text-green-700">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Llevaremos nuestra innovación al mercado español, donde ya hay equipos esperando para utilizar nuestra tecnología</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Seguiremos siendo pioneros en IA y automatización, marcando el camino que otros seguirán</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Con vuestro talento y pasión, transformaremos la manera en que las empresas encuentran y nutren el talento del futuro</span>
                </li>
              </ul>
              <div class="mt-6 -mx-6 -mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                  alt="Infraestructura tecnológica y automatización"
                  class="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 overflow-hidden">
              <h3 class="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Nuestro Compromiso
              </h3>
              <p class="text-purple-700 leading-relaxed">
                Estamos construyendo el futuro de la gestión del talento. Con una inversión estratégica de 500K€, un equipo de expertos apasionados y tecnología de vanguardia, nos comprometemos a revolucionar la forma en que las empresas encuentran y contratan talento. Juntos, no solo estamos creando una plataforma; estamos definiendo un nuevo estándar en la industria del reclutamiento.
              </p>
              <div class="mt-6 -mx-6 -mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                  alt="Candidata firmando contrato"
                  class="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const quarterlyObjectives = {
    Q1: [
        'Automatización de publicación en 5 portales',
        'API de integración con portales principales',
        'Sistema de notificaciones en tiempo real',
        'Refactorizar Scraper de LinkedIn (200+ perfiles/día)',
    ],
    Q2: [
        'Implementar análisis con Hotjar',
        'Lanzar editor WYSIWYG de páginas de carreras',
        'Respuestas automatizadas basadas en IA',
        'Escalar a 1400+ perfiles diarios',
    ],
    Q3: [
        'Localización para mercado español',
        'Integraciones HRIS españolas',
        'Alcanzar 400k perfiles',
        'Primeras 10 ventas en España',
    ],
    Q4: [
        'Expansión a 3 nuevas integraciones',
        'Automatización completa del proceso',
        'Alcanzar 500k perfiles',
        'Consolidar ventas en España',
    ],
};

const quarterlyMilestones = {
    Q1: '200+ perfiles/día y 5 portales integrados',
    Q2: '1400+ perfiles/día y editor WYSIWYG',
    Q3: 'Lanzamiento en España con 400k perfiles',
    Q4: '500k perfiles y consolidación en España',
};

const kpis = [
    {
        name: 'Perfiles en Base de Datos',
        current: '150,000',
        target: '500,000',
        progress: 30,
    },
    {
        name: 'CLTV',
        current: '€2,500',
        target: '€4,000',
        progress: 62,
    },
    {
        name: 'Retención',
        current: '85%',
        target: '95%',
        progress: 89,
    },
];

const salaryItems = [
    {
        name: 'Consultor Arquitecto',
        details: '16h x 100€/h x 12 meses',
        amount: '19.200',
    },
    {
        name: 'Desarrollador Backend',
        details: '1 x 8000€/mes',
        amount: '96.000',
    },
    {
        name: 'Desarrollador Frontend',
        details: '1 x 8000€/mes',
        amount: '96.000',
    },
    {
        name: 'Especialista IA/ML',
        details: '1 x 8000€/mes',
        amount: '96.000',
    },
    {
        name: 'DevOps/SRE',
        details: '1 x 6000€/mes',
        amount: '72.000',
    },
    {
        name: 'Incremento Dev actual',
        details: '1 x 1000€/mes',
        amount: '12.000',
    },
];

const infrastructureItems = [
    { name: 'Herramientas y licencias', amount: '10.000' },
    { name: 'Infraestructura cloud', amount: '45.000' },
    { name: 'Hardware', amount: '10.000' },
];

const teamStructure = [
    {
        role: 'Consultor Arquitecto',
        description: 'Experto senior en arquitectura SaaS para consultoría estratégica y diseño de sistemas',
        compensation: '100€/h (16h/mes)',
    },
    {
        role: 'Desarrollador Backend',
        description: 'Especialista en APIs, microservicios y bases de datos para el core del producto',
        compensation: '8.000€/mes',
    },
    {
        role: 'Desarrollador Frontend',
        description: 'Experto en Vue.js para desarrollo de interfaces modernas y experiencia de usuario',
        compensation: '8.000€/mes',
    },
    {
        role: 'Especialista IA/ML',
        description: 'Experto en Python y NLP para sistemas de procesamiento y análisis de perfiles',
        compensation: '8.000€/mes',
    },
    {
        role: 'DevOps/SRE',
        description: 'Especialista en infraestructura cloud y automatización de procesos',
        compensation: '6.000€/mes',
    },
];

const risks = [
    {
        name: 'Cambios en APIs de portales',
        mitigation: 'Monitorización continua y sistema de alertas temprano',
    },
    {
        name: 'Competencia en mercado español',
        mitigation: 'Diferenciación por tecnología y servicio personalizado',
    },
    {
        name: 'Escalabilidad de infraestructura',
        mitigation: 'Arquitectura cloud-native y tests de carga regulares',
    },
    {
        name: 'Retención de talento',
        mitigation: 'Plan de desarrollo profesional y compensación competitiva',
    },
];

const isHeaderVisible = ref(true);
const isTimelineVisible = ref(false);
const isKpiVisible = ref(false);
const selectedQuarter = ref(null);
const kpiProgress = ref(kpis.map(kpi => kpi.progress));

const stats = [
    {
        title: 'Facturación Actual',
        value: '75K €',
        detail: '(FR + UK)',
        bgClass: 'bg-blue-50',
        textClass: 'text-blue-600',
    },
    {
        title: 'Facturación Objetivo',
        value: '265K €',
        detail: '(205K FR+UK, 60K ES)',
        bgClass: 'bg-green-50',
        textClass: 'text-green-600',
    },
    {
        title: 'Inversión',
        value: '500K €',
        detail: '',
        bgClass: 'bg-purple-50',
        textClass: 'text-purple-600',
    },
];

const timelineSection = ref(null);
const kpiSection = ref(null);
const budgetSection = ref(null);
const teamSection = ref(null);
const riskSection = ref(null);
const motivationalSection = ref(null);
const isBudgetVisible = ref(false);
const isTeamVisible = ref(false);
const isRiskVisible = ref(false);
const isMotivationalVisible = ref(false);

const isPresentationMode = ref(true);
const hasStartedPresentation = ref(false);
const clickedIndexes = ref([]);
const clickCount = ref(0);

// Update the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const sectionId = entry.target.dataset.section;
        switch (sectionId) {
        case 'timeline':
            isTimelineVisible.value = entry.isIntersecting;
            break;
        case 'kpi':
            isKpiVisible.value = entry.isIntersecting;
            if (entry.isIntersecting) animateAllKPIs();
            break;
        case 'budget':
            isBudgetVisible.value = entry.isIntersecting;
            break;
        case 'team':
            isTeamVisible.value = entry.isIntersecting;
            break;
        case 'risk':
            isRiskVisible.value = entry.isIntersecting;
            break;
        case 'motivational':
            isMotivationalVisible.value = entry.isIntersecting;
            break;
        }
    });
}, { threshold: 0.2 });

onMounted(() => {
    // Show header immediately in presentation mode
    isHeaderVisible.value = true;

    // Only start observing sections after presentation mode is done
    if (!isPresentationMode.value) {
        const sections = [
            { ref: timelineSection.value, id: 'timeline' },
            { ref: kpiSection.value, id: 'kpi' },
            { ref: budgetSection.value, id: 'budget' },
            { ref: teamSection.value, id: 'team' },
            { ref: riskSection.value, id: 'risk' },
            { ref: motivationalSection.value, id: 'motivational' },
        ];

        sections.forEach(({ ref, id }) => {
            if (ref) {
                ref.dataset.section = id;
                observer.observe(ref);
            }
        });
    }
});

onUnmounted(() => {
    observer.disconnect();
});

// Interactive functions
function handleStatClick (index) {
    if (!clickedIndexes.value.includes(index)) {
        clickedIndexes.value.push(index);
        clickCount.value++;

        if (clickCount.value >= 3) {
            setTimeout(() => {
                startMainPresentation();
            }, 300);
        }
    }
}

function startMainPresentation () {
    hasStartedPresentation.value = true;
    isPresentationMode.value = false;

    // Show sections sequentially
    setTimeout(() => {
        isTimelineVisible.value = true;
        isKpiVisible.value = true;
        isBudgetVisible.value = true;
        isTeamVisible.value = true;
        isRiskVisible.value = true;
        isMotivationalVisible.value = true;
    }, 100);

    // Trigger KPI animations
    setTimeout(() => {
        kpiProgress.value = kpis.map(() => 0);
        requestAnimationFrame(() => {
            kpiProgress.value = kpis.map(kpi => kpi.progress);
        });
    }, 600);
}

function selectQuarter (quarter) {
    selectedQuarter.value = selectedQuarter.value === quarter ? null : quarter;
}

function animateKPI (index) {
    // Eliminamos la animación al hacer click
    return;
}

function animateAllKPIs () {
    // Solo animamos una vez al cargar
    kpiProgress.value = kpis.map(kpi => kpi.progress);
}

// Función para obtener el texto del tooltip según el índice
function getTooltipText(index) {
    if (clickCount.value === 0) return 'Click para empezar';
    const remaining = 3 - clickCount.value;
    return `${remaining} click${remaining > 1 ? 's' : ''} más para continuar`;
}
</script>

<style scoped>
.strategic-plan-dashboard {
  background-color: rgb(249 250 251);
  user-select: none;
  cursor: default;
  min-height: 100vh;
  height: 100%;
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.strategic-plan-dashboard > div {
  width: 100%;
}

@media (min-width: 768px) {
  .strategic-plan-dashboard > div {
    max-width: calc(100vw - 17px);
  }

  ::-webkit-scrollbar {
    width: 17px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border: 5px solid transparent;
    border-radius: 9999px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }
}

/* Eliminar el cambio de padding en modo presentación */
.strategic-plan-dashboard.overflow-hidden {
  overflow: hidden;
}

/* Estilos personalizados para la barra de scroll */
::-webkit-scrollbar {
  width: 17px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border: 5px solid transparent;
  border-radius: 9999px;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

.stats-card {
  @apply min-w-[200px] relative shadow-sm;
  transition: all 0.3s ease;
}

/* Smooth transitions */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Add new transition for presentation mode */
.presentation-enter-active,
.presentation-leave-active {
  transition: all 0.3s ease;
}

.presentation-enter-from,
.presentation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Transition Classes */
.stats-fade-enter-active,
.stats-fade-leave-active,
.quarters-fade-enter-active,
.quarters-fade-leave-active,
.kpi-fade-enter-active,
.kpi-fade-leave-active {
  transition: all 0.5s ease;
}

.stats-fade-enter-from,
.stats-fade-leave-to,
.quarters-fade-enter-from,
.quarters-fade-leave-to,
.kpi-fade-enter-from,
.kpi-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.team-fade-enter-active,
.team-fade-leave-active,
.risk-fade-enter-active,
.risk-fade-leave-active {
  transition: all 0.5s ease;
}

.team-fade-enter-from,
.team-fade-leave-to,
.risk-fade-enter-from,
.risk-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Update KPI animation timing */
.kpi-fade-enter-active,
.kpi-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Update the safelist in tailwind.config.js to include these new classes */
.z-10 {
  z-index: 10;
}

.-z-10 {
  z-index: -10;
}

@keyframes card-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.15);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.animate-card-pulse {
  animation: card-pulse 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

.tooltip-transition {
  transition: opacity 0ms;
}

.group:hover .tooltip-transition {
  transition: opacity 500ms 1000ms;
}

/* Mejoras en la tipografía */
h1, h2 {
  @apply tracking-tight;
}

.text-2xl {
  @apply tracking-tight leading-tight;
}

/* Efecto de glass morphism para las cards */
.stats-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  padding: 2px;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Mejoras en la accesibilidad del foco */
.stats-card:focus {
  @apply outline-none ring-2 ring-blue-400 ring-offset-2;
}

/* Animación suave para el scroll */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 2rem;
  @apply antialiased;
}

@keyframes text-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-text-pulse {
  animation: text-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
