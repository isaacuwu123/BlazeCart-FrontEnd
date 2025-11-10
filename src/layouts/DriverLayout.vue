<template>
    <div
        class="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
        <!-- Mobile menu overlay with backdrop blur -->
        <Transition name="overlay">
            <div
                v-if="sidebarOpen"
                class="fixed inset-0 z-40 lg:hidden"
                @click="sidebarOpen = false"
            >
                <div
                    class="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-black/70 via-black/60 to-black/50 backdrop-blur-lg"
                ></div>
            </div>
        </Transition>

        <!-- Enhanced Sidebar -->
        <Transition name="sidebar">
            <aside
                v-show="sidebarOpen || !isMobile"
                class="fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-out border-r shadow-2xl lg:relative backdrop-blur-2xl border-slate-200/80 dark:border-slate-700/80"
                :class="[
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    isMobile
                        ? 'bg-white/75 dark:bg-slate-900/75'
                        : 'bg-white/98 dark:bg-slate-900/98',
                ]"
                style="width: 20rem"
            >
                <!-- Logo Section with animation -->
                <div
                    class="relative flex-shrink-0 h-20 px-6 overflow-hidden shadow-xl group sm:h-18 lg:h-16"
                    :class="
                        isMobile
                            ? 'bg-gradient-to-r from-amber-500/90 via-orange-500/90 to-red-500/90 backdrop-blur-xl'
                            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
                    "
                >
                    <!-- Animated background effect -->
                    <div
                        class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 group-hover:opacity-100"
                    ></div>

                    <div class="relative flex items-center justify-center h-full space-x-3">
                        <div class="relative">
                            <div
                                class="flex items-center justify-center transition-transform duration-300 border shadow-2xl bg-white/25 backdrop-blur-md rounded-2xl border-white/40 w-13 h-13 sm:w-12 sm:h-12 lg:w-11 lg:h-11 group-hover:scale-110 group-hover:rotate-3"
                            >
                                <TruckIcon
                                    class="text-white drop-shadow-lg w-7 h-7 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                />
                            </div>
                            <div
                                class="absolute flex items-center justify-center w-6 h-6 border-2 border-white rounded-full shadow-lg bg-gradient-to-br from-emerald-400 to-green-500 sm:w-5 sm:h-5 -top-1 -right-1 animate-pulse"
                            >
                                <SparklesIcon class="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <span
                                class="block text-2xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-xl lg:text-lg xl:text-xl"
                            >
                                BlazeCart
                            </span>
                            <div class="flex items-center mt-0.5 space-x-1.5">
                                <ShieldCheckIcon class="w-3 h-3 text-white/90" />
                                <span
                                    class="text-xs font-semibold tracking-wide uppercase text-white/95"
                                >
                                    {{ t('driverPortal') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Navigation -->
                <nav
                    class="flex-1 px-3 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent hover:scrollbar-thumb-amber-300 dark:scrollbar-thumb-slate-700 dark:hover:scrollbar-thumb-slate-600 sm:px-4 sm:py-8"
                >
                    <div class="space-y-2">
                        <div v-for="(menu, index) in menuItems" :key="menu.key">
                            <router-link
                                :to="menu.path"
                                class="relative flex items-center overflow-hidden font-semibold transition-all duration-300 group rounded-2xl hover:scale-[1.02] active:scale-[0.98] px-4 py-5 sm:px-5 sm:py-4 lg:py-3.5"
                                :class="
                                    isActiveRoute(menu.path)
                                        ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 text-amber-700 dark:text-amber-400 shadow-lg shadow-amber-100/50 dark:shadow-none border border-amber-200/70 dark:border-amber-500/30'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 hover:text-slate-900 dark:hover:text-white hover:shadow-md border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50'
                                "
                                :style="{ animationDelay: `${index * 50}ms` }"
                            >
                                <!-- Hover gradient effect -->
                                <div
                                    class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-transparent via-amber-50/30 to-transparent dark:via-slate-600/30 group-hover:opacity-100"
                                ></div>

                                <div class="relative flex items-center w-full">
                                    <!-- Icon Container -->
                                    <div
                                        class="relative flex items-center justify-center mr-4 transition-all duration-300 rounded-xl group-hover:scale-110 w-11 h-11 sm:w-10 sm:h-10 lg:w-9 lg:h-9"
                                        :class="
                                            isActiveRoute(menu.path)
                                                ? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20 shadow-inner'
                                                : 'bg-slate-100 dark:bg-slate-700/60 group-hover:bg-slate-200 dark:group-hover:bg-slate-600/80'
                                        "
                                    >
                                        <component
                                            :is="menu.icon"
                                            class="transition-all duration-300 w-6 h-6 sm:w-5 sm:h-5 lg:w-4.5 lg:h-4.5"
                                            :class="
                                                isActiveRoute(menu.path)
                                                    ? 'text-amber-600 dark:text-amber-400'
                                                    : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                                            "
                                            :stroke-width="isActiveRoute(menu.path) ? 2.5 : 2"
                                        />

                                        <!-- Badge for active route -->
                                        <div
                                            v-if="isActiveRoute(menu.path)"
                                            class="absolute w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 -top-0.5 -right-0.5 animate-pulse"
                                        ></div>
                                    </div>

                                    <span class="text-base font-semibold sm:text-sm lg:text-sm">
                                        {{ t(menu.key) }}
                                    </span>

                                    <!-- Active indicator -->
                                    <div
                                        v-if="isActiveRoute(menu.path)"
                                        class="absolute right-0 h-10 rounded-l-full w-1.5 bg-gradient-to-b from-amber-400 via-orange-400 to-red-400 shadow-lg"
                                    ></div>

                                    <!-- Arrow indicator on hover -->
                                    <ChevronRightIcon
                                        class="absolute w-5 h-5 transition-all duration-300 opacity-0 right-3 group-hover:opacity-100 group-hover:translate-x-1"
                                        :class="
                                            isActiveRoute(menu.path)
                                                ? 'text-amber-600 dark:text-amber-400'
                                                : 'text-slate-400'
                                        "
                                    />
                                </div>
                            </router-link>
                        </div>
                    </div>
                </nav>

                <!-- Enhanced User Profile Section -->
                <div
                    class="flex-shrink-0 p-4 border-t sm:p-5"
                    :class="
                        isMobile
                            ? 'border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-900/30 backdrop-blur-xl'
                            : 'border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50'
                    "
                >
                    <div
                        class="relative p-4 overflow-hidden border shadow-xl backdrop-blur-xl rounded-2xl sm:p-5 group"
                        :class="
                            isMobile
                                ? 'bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/85 dark:to-slate-700/85 border-slate-200/60 dark:border-slate-600/60'
                                : 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/95 dark:to-slate-700/95 border-slate-200/80 dark:border-slate-600/80'
                        "
                    >
                        <!-- Animated gradient background -->
                        <div
                            class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-amber-500/5 dark:to-orange-500/5 group-hover:opacity-100"
                        ></div>

                        <div class="relative flex items-center space-x-4">
                            <div class="relative flex-shrink-0">
                                <div
                                    class="flex items-center justify-center w-16 h-16 shadow-2xl rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 sm:w-14 sm:h-14 lg:w-13 lg:h-13 ring-4 ring-white/50 dark:ring-slate-800/50"
                                >
                                    <UserIcon
                                        class="w-8 h-8 text-white sm:w-7 sm:h-7 lg:w-6 lg:h-6"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <div
                                    class="absolute flex items-center justify-center w-6 h-6 border-white rounded-full shadow-lg border-3 bg-gradient-to-br from-emerald-400 to-green-500 sm:w-5 sm:h-5 -bottom-1 -right-1 ring-2 ring-white/50"
                                >
                                    <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-base font-bold truncate text-slate-900 dark:text-white sm:text-sm"
                                >
                                    {{ userFullName }}
                                </p>
                                <p
                                    class="text-sm truncate text-slate-500 dark:text-slate-400 sm:text-xs"
                                >
                                    {{ userEmail }}
                                </p>
                                <div class="flex items-center mt-1.5 space-x-1.5">
                                    <div
                                        class="relative flex items-center justify-center w-3 h-3 rounded-full bg-emerald-400 sm:w-2.5 sm:h-2.5"
                                    >
                                        <div
                                            class="absolute w-full h-full rounded-full opacity-75 bg-emerald-400 animate-ping"
                                        ></div>
                                        <div
                                            class="relative w-2 h-2 rounded-full bg-emerald-500 sm:w-1.5 sm:h-1.5"
                                        ></div>
                                    </div>
                                    <span
                                        class="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                                    >
                                        {{ t('online') }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-col space-y-2">
                                <!-- Profile button -->
                                <button
                                    @click="goToProfile"
                                    class="transition-all duration-200 text-amber-600 dark:text-amber-400 rounded-xl hover:text-amber-700 hover:bg-amber-50 dark:hover:text-amber-300 dark:hover:bg-amber-500/10 hover:scale-110 active:scale-95 border border-amber-200/50 dark:border-amber-500/20 p-3 sm:p-2.5 lg:p-2 shadow-sm hover:shadow-md group"
                                    :title="t('profile')"
                                >
                                    <UserCircleIcon
                                        class="w-5 h-5 transition-transform sm:w-4.5 sm:h-4.5 lg:w-4 lg:h-4 group-hover:rotate-12"
                                    />
                                </button>
                                <!-- Logout button -->
                                <button
                                    @click="logout"
                                    class="transition-all duration-200 shadow-sm text-slate-500 rounded-xl hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 hover:scale-110 active:scale-95 hover:shadow-md p-3 sm:p-2.5 lg:p-2 border border-transparent hover:border-red-200/50 dark:hover:border-red-500/20 group"
                                    :title="t('logout')"
                                >
                                    <LogOutIcon
                                        class="w-5 h-5 transition-transform sm:w-4.5 sm:h-4.5 lg:w-4 lg:h-4 group-hover:-translate-x-1"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </Transition>

        <!-- Main Content Area -->
        <div class="flex flex-col flex-1 overflow-hidden">
            <!-- Enhanced Top Header -->
            <header
                class="z-30 flex-shrink-0 border-b shadow-md border-slate-200/80 dark:border-slate-700/80 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95"
            >
                <div
                    class="flex items-center justify-between px-4 h-18 sm:h-16 lg:h-14 sm:px-6 lg:px-8"
                >
                    <div class="flex items-center space-x-4 sm:space-x-6">
                        <!-- Enhanced mobile menu button -->
                        <button
                            @click="toggleSidebar"
                            class="relative p-4 transition-all duration-200 text-slate-700 rounded-xl lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-400/50 hover:text-slate-900 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:from-slate-800 dark:hover:to-slate-700 hover:scale-105 active:scale-95 hover:shadow-lg sm:p-3 group"
                        >
                            <Transition name="menu-icon" mode="out-in">
                                <MenuIcon
                                    v-if="!sidebarOpen"
                                    :key="'menu'"
                                    class="transition-transform w-7 h-7 sm:w-6 sm:h-6 group-hover:rotate-180"
                                />
                                <XIcon
                                    v-else
                                    :key="'close'"
                                    class="transition-transform w-7 h-7 sm:w-6 sm:h-6 group-hover:rotate-90"
                                />
                            </Transition>
                        </button>

                        <!-- Enhanced breadcrumb -->
                        <nav class="hidden sm:flex" aria-label="Breadcrumb">
                            <ol class="flex items-center space-x-2 sm:space-x-3">
                                <li>
                                    <div class="flex items-center group">
                                        <div
                                            class="flex items-center justify-center mr-3 transition-all duration-200 w-9 h-9 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-xl group-hover:scale-110 group-hover:shadow-md"
                                        >
                                            <HomeIcon
                                                class="w-4.5 h-4.5 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                                            />
                                        </div>
                                        <span
                                            class="text-sm font-semibold text-slate-600 dark:text-slate-400"
                                        >
                                            {{ t('driver') }}
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center">
                                        <ChevronRightIcon
                                            class="w-4 h-4 mx-2 text-slate-400 dark:text-slate-500"
                                        />
                                        <div
                                            class="px-3 py-2 border shadow-md bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-xl border-amber-200/70 dark:border-amber-500/30"
                                        >
                                            <span
                                                class="text-sm font-bold capitalize text-amber-700 dark:text-amber-400"
                                            >
                                                {{ t(currentPageName) }}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <!-- Enhanced header actions -->
                    <div class="flex items-center space-x-2 lg:space-x-3">
                        <!-- Desktop search with icon animation -->
                        <div class="hidden lg:block">
                            <div class="relative group">
                                <SearchIcon
                                    class="absolute w-4.5 h-4.5 transform -translate-y-1/2 text-slate-400 dark:text-slate-400 left-4 top-1/2 transition-all group-hover:text-amber-500 group-focus-within:text-amber-500 group-focus-within:scale-110"
                                />
                                <input
                                    v-model="searchQuery"
                                    type="text"
                                    :placeholder="t('search')"
                                    class="w-64 py-3 pl-12 pr-4 transition-all duration-200 bg-white border shadow-md xl:w-80 text-slate-900 placeholder-slate-500 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 dark:text-white dark:placeholder-slate-400 hover:shadow-lg focus:w-72 xl:focus:w-96"
                                    @focus="searchFocused = true"
                                    @blur="searchFocused = false"
                                />
                                <kbd
                                    v-if="!searchFocused && !searchQuery"
                                    class="absolute px-2 py-1 text-xs font-semibold -translate-y-1/2 border rounded-lg right-4 top-1/2 text-slate-400 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                                >
                                    ⌘K
                                </kbd>
                            </div>
                        </div>

                        <!-- Mobile search button -->
                        <button
                            @click="showMobileSearch = !showMobileSearch"
                            class="transition-all duration-200 shadow-sm text-slate-600 rounded-xl hover:text-amber-600 hover:bg-amber-50 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-amber-500/10 hover:scale-110 active:scale-95 hover:shadow-md lg:hidden p-3 sm:p-2.5 border border-transparent hover:border-amber-200/50 dark:hover:border-amber-500/20"
                        >
                            <SearchIcon class="w-6 h-6 sm:w-5 sm:h-5" />
                        </button>

                        <!-- Enhanced language selector -->
                        <div class="relative" ref="languageDropdownRef">
                            <button
                                @click="toggleLanguageDropdown"
                                class="flex items-center transition-all duration-200 shadow-sm text-slate-600 rounded-xl hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 hover:scale-105 active:scale-95 hover:shadow-md space-x-2 p-3 sm:p-2.5 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50"
                            >
                                <GlobeIcon class="w-6 h-6 sm:w-5 sm:h-5" />
                                <span class="hidden text-sm font-bold sm:block">{{
                                    currentLanguage.toUpperCase()
                                }}</span>
                                <ChevronDownIcon
                                    class="w-4 h-4 transition-transform duration-300"
                                    :class="{ 'rotate-180': languageDropdownOpen }"
                                />
                            </button>

                            <Transition name="dropdown">
                                <div
                                    v-show="languageDropdownOpen"
                                    class="absolute right-0 z-50 w-56 mt-2 overflow-hidden bg-white border shadow-2xl dark:bg-slate-800 backdrop-blur-2xl border-slate-200 dark:border-slate-700 rounded-2xl sm:w-52"
                                >
                                    <div class="py-2">
                                        <button
                                            v-for="lang in languages"
                                            :key="lang.code"
                                            @click="changeLanguage(lang.code)"
                                            class="relative flex items-center justify-between w-full px-5 py-4 space-x-4 text-sm font-medium text-left transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 sm:py-3 group"
                                            :class="
                                                currentLanguage === lang.code
                                                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700/80 dark:to-slate-600/80 text-amber-700 dark:text-amber-400'
                                                    : 'text-slate-700 dark:text-slate-300'
                                            "
                                        >
                                            <div class="flex items-center space-x-3">
                                                <span
                                                    class="text-2xl transition-transform group-hover:scale-125"
                                                    >{{ lang.flag }}</span
                                                >
                                                <span>{{ lang.name }}</span>
                                            </div>
                                            <div class="flex items-center justify-center w-5 h-5">
                                                <Transition name="check-fade">
                                                    <CheckIcon
                                                        v-if="currentLanguage === lang.code"
                                                        class="w-5 h-5 text-amber-600 dark:text-amber-400"
                                                    />
                                                </Transition>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <!-- Enhanced dark mode toggle -->
                        <button
                            @click="toggleDarkMode"
                            class="relative transition-all duration-200 shadow-sm text-slate-600 rounded-xl hover:text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-500/10 hover:scale-110 active:scale-95 hover:shadow-md p-3 sm:p-2.5 border border-transparent hover:border-amber-200/50 dark:hover:border-amber-500/20 group overflow-hidden"
                        >
                            <Transition name="theme-icon" mode="out-in">
                                <SunIcon
                                    v-if="isDarkMode"
                                    :key="'sun'"
                                    class="w-6 h-6 transition-transform sm:w-5 sm:h-5 group-hover:rotate-180"
                                />
                                <MoonIcon
                                    v-else
                                    :key="'moon'"
                                    class="w-6 h-6 transition-transform sm:w-5 sm:h-5 group-hover:-rotate-12"
                                />
                            </Transition>
                        </button>
                    </div>
                </div>

                <!-- Enhanced mobile search bar -->
                <Transition name="mobile-search">
                    <div
                        v-if="showMobileSearch"
                        class="px-4 pb-4 border-t sm:px-6 border-slate-200/50 dark:border-slate-700/50 lg:hidden bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-800/30"
                    >
                        <div class="relative mt-4">
                            <SearchIcon
                                class="absolute w-5 h-5 transform -translate-y-1/2 text-slate-400 dark:text-slate-400 left-4 top-1/2"
                            />
                            <input
                                ref="mobileSearchInput"
                                v-model="searchQuery"
                                type="text"
                                :placeholder="t('search')"
                                class="w-full py-4 pl-12 pr-4 text-base transition-all duration-200 bg-white border shadow-lg text-slate-900 placeholder-slate-500 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 dark:text-white dark:placeholder-slate-400"
                            />
                            <button
                                v-if="searchQuery"
                                @click="searchQuery = ''"
                                class="absolute p-2 transition-all duration-200 transform -translate-y-1/2 rounded-lg right-2 top-1/2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                                <XIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </Transition>
            </header>

            <!-- Enhanced Page Content -->
            <main
                class="relative flex-1 p-3 overflow-auto transition-all duration-300 bg-gradient-to-br from-slate-50/80 via-white to-slate-100/80 dark:from-slate-950/80 dark:via-slate-900 dark:to-slate-800/80 sm:p-4 lg:p-6 xl:p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700 dark:hover:scrollbar-thumb-slate-600"
            >
                <div class="mx-auto max-w-[1600px]">
                    <div
                        class="relative overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-slate-200/80 dark:border-slate-700/80 min-h-[calc(100vh-10rem)] sm:min-h-[calc(100vh-12rem)] p-4 sm:p-6 lg:p-8 xl:p-10 mb-8"
                    >
                        <!-- Decorative gradient -->
                        <div
                            class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
                        ></div>

                        <!-- Loading overlay -->
                        <Transition name="loading">
                            <div
                                v-if="isLoading"
                                class="absolute inset-0 z-10 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl"
                            >
                                <div class="text-center">
                                    <div
                                        class="relative inline-flex items-center justify-center w-20 h-20 mb-6"
                                    >
                                        <div
                                            class="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 animate-spin"
                                        ></div>
                                        <div
                                            class="absolute bg-white rounded-full inset-2 dark:bg-slate-900"
                                        ></div>
                                        <TruckIcon
                                            class="relative w-10 h-10 text-amber-600 dark:text-amber-400 animate-pulse"
                                        />
                                    </div>
                                    <p
                                        class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 animate-pulse"
                                    >
                                        {{ t('loading') }}...
                                    </p>
                                </div>
                            </div>
                        </Transition>

                        <!-- Page content with transition -->
                        <Transition
                            name="page"
                            mode="out-in"
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @before-leave="beforeLeave"
                            @leave="leave"
                        >
                            <router-view :key="$route.fullPath" />
                        </Transition>
                    </div>
                </div>

                <!-- Scroll to top button -->
                <Transition name="scroll-top">
                    <button
                        v-show="showScrollTop"
                        @click="scrollToTop"
                        class="fixed z-20 p-4 text-white transition-all duration-300 border shadow-2xl bottom-8 right-8 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-2xl hover:scale-110 active:scale-95 border-amber-400/50 group"
                    >
                        <ArrowUpIcon
                            class="w-6 h-6 transition-transform group-hover:-translate-y-1"
                        />
                    </button>
                </Transition>
            </main>
        </div>
    </div>
</template>

<script setup>
import { initializeDarkMode, isDarkMode, toggleDarkMode } from '@/composables/useDarkMode';
import {
    ArrowUpIcon,
    BellIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    FileTextIcon,
    GlobeIcon,
    HomeIcon,
    LogOutIcon,
    MenuIcon,
    MoonIcon,
    RouteIcon,
    SearchIcon,
    ShieldCheckIcon,
    SparklesIcon,
    SunIcon,
    TruckIcon,
    UserCircleIcon,
    UserIcon,
    WalletIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// --- STATE ---
const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);
const languageDropdownOpen = ref(false);
const currentLanguage = ref('es');
const showMobileSearch = ref(false);
const mobileSearchInput = ref(null);
const isLoading = ref(false);
const infoUser = ref(null);
const languageDropdownRef = ref(null);
const isMobile = ref(window.innerWidth < 1024);
const searchQuery = ref('');
const searchFocused = ref(false);
const showScrollTop = ref(false);
const unreadNotifications = ref(3);

// User data from localStorage
const userFromStorage = localStorage.getItem('user');
if (userFromStorage) {
    try {
        infoUser.value = JSON.parse(userFromStorage);
    } catch (e) {
        console.error('[Dashboard] Error parsing user data:', e);
        localStorage.removeItem('user');
    }
}

// Computed properties
const userFullName = computed(() => {
    if (!infoUser.value) return 'Usuario desconocido';
    return (
        `${infoUser.value.nombre || ''} ${infoUser.value.apellidos || ''}`.trim() ||
        'Usuario desconocido'
    );
});

const userEmail = computed(() => {
    return infoUser.value?.email || 'usuario@ejemplo.com';
});

// Menu items
const menuItems = [
    { key: 'dashboard', path: '/driver/dashboard', icon: RouteIcon },
    { key: 'formulario', path: '/formulario', icon: FileTextIcon },
    {
        key: 'transaccionesFinancieras',
        path: '/driver/gestion-transacciones-financieras',
        icon: WalletIcon,
    },
    { key: 'pagosPendientes', path: '/driver/gestion-pagos-pendientes', icon: BellIcon },
];

// Languages
const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
];

// Translations
const translations = {
    es: {
        dashboard: 'Dashboard',
        formulario: 'Formulario',
        transaccionesFinancieras: 'Transacciones Financieras',
        pagosPendientes: 'Pagos Pendientes',
        search: 'Buscar en todo...',
        profile: 'Ver Perfil',
        logout: 'Cerrar Sesión',
        driverPortal: 'Portal del Conductor',
        online: 'En línea',
        driver: 'Conductor',
        quickActions: 'Acciones Rápidas',
        help: 'Ayuda',
        settings: 'Configuración',
        loading: 'Cargando',
    },
    en: {
        dashboard: 'Dashboard',
        formulario: 'Form',
        transaccionesFinancieras: 'Financial Transactions',
        pagosPendientes: 'Pending Payments',
        search: 'Search everything...',
        profile: 'View Profile',
        logout: 'Sign Out',
        driverPortal: 'Driver Portal',
        online: 'Online',
        driver: 'Driver',
        quickActions: 'Quick Actions',
        help: 'Help',
        settings: 'Settings',
        loading: 'Loading',
    },
};

const t = key => translations[currentLanguage.value][key] || key;

const currentPageName = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || 'dashboard';

    const pathMap = {
        dashboard: 'dashboard',
        formulario: 'formulario',
        'gestion-transacciones-financieras': 'transaccionesFinancieras',
        'gestion-pagos-pendientes': 'pagosPendientes',
    };

    return pathMap[lastSegment] || lastSegment;
});

// Methods
const isActiveRoute = path => {
    return route.path === path || route.path.startsWith(path + '/');
};

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const toggleLanguageDropdown = () => {
    languageDropdownOpen.value = !languageDropdownOpen.value;
};

const toggleNotifications = () => {
    console.log('[Dashboard] Toggle notifications');
    // Implement notifications panel
};

const changeLanguage = lang => {
    currentLanguage.value = lang;
    languageDropdownOpen.value = false;
    localStorage.setItem('language', lang);
    console.log('[Dashboard] Language changed to:', lang);
};

const goToProfile = () => {
    console.log('[Dashboard] Navigating to profile');
    router.push('/profile');
    if (isMobile.value) {
        sidebarOpen.value = false;
    }
};

const logout = () => {
    console.log('[Dashboard] Logging out');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    infoUser.value = null;
    router.push('/login');
};

const handleQuickAction = action => {
    console.log('[Dashboard] Quick action:', action);
    if (action === 'settings') {
        router.push('/settings');
    } else if (action === 'help') {
        // Open help modal or navigate to help page
    }
    if (isMobile.value) {
        sidebarOpen.value = false;
    }
};

const handleClickOutside = event => {
    if (languageDropdownRef.value && !languageDropdownRef.value.contains(event.target)) {
        languageDropdownOpen.value = false;
    }
};

const handleResize = () => {
    isMobile.value = window.innerWidth < 1024;
    if (!isMobile.value) {
        sidebarOpen.value = false;
        showMobileSearch.value = false;
    }
};

const handleScroll = event => {
    showScrollTop.value = event.target.scrollTop > 300;
};

const scrollToTop = () => {
    const main = document.querySelector('main');
    if (main) {
        main.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Transition methods
const beforeEnter = el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
};

const enter = (el, done) => {
    el.offsetHeight; // Trigger reflow
    el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    done();
};

const afterEnter = el => {
    el.style.transition = '';
};

const beforeLeave = el => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
};

const leave = (el, done) => {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = 0;
    el.style.transform = 'translateY(-20px)';
    setTimeout(done, 300);
};

// Watchers & Lifecycle
watch(
    route,
    newRoute => {
        isLoading.value = true;
        showMobileSearch.value = false;

        if (isMobile.value) {
            sidebarOpen.value = false;
        }

        setTimeout(() => {
            isLoading.value = false;
        }, 300);
    },
    { immediate: true }
);

watch(showMobileSearch, async newValue => {
    if (newValue) {
        await nextTick();
        mobileSearchInput.value?.focus();
    }
});

// Keyboard shortcuts
const handleKeyPress = event => {
    // CMD+K or CTRL+K for search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (isMobile.value) {
            showMobileSearch.value = true;
        } else {
            document.querySelector('input[type="text"]')?.focus();
        }
    }

    // ESC to close modals
    if (event.key === 'Escape') {
        languageDropdownOpen.value = false;
        showMobileSearch.value = false;
        if (isMobile.value) {
            sidebarOpen.value = false;
        }
    }
};

onMounted(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
        currentLanguage.value = savedLanguage;
    }

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyPress);

    const main = document.querySelector('main');
    if (main) {
        main.addEventListener('scroll', handleScroll);
    }

    initializeDarkMode();
    console.log('[Dashboard] Layout initialized');
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('keydown', handleKeyPress);

    const main = document.querySelector('main');
    if (main) {
        main.removeEventListener('scroll', handleScroll);
    }
});
</script>

<style scoped>
/* Enhanced scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thumb-amber-200::-webkit-scrollbar-thumb {
    background: rgb(253 230 138);
    border-radius: 3px;
}

.scrollbar-thumb-amber-200::-webkit-scrollbar-thumb:hover {
    background: rgb(252 211 77);
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
    background: rgb(203 213 225);
    border-radius: 3px;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb:hover {
    background: rgb(148 163 184);
}

.dark .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb {
    background: rgb(51 65 85);
    border-radius: 3px;
}

.dark .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb:hover {
    background: rgb(71 85 105);
}

/* Enhanced transitions */
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(-100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}

/* SOLUCIÓN: Transición suave para el check icon */
.check-fade-enter-active,
.check-fade-leave-active {
    transition: all 0.2s ease;
}

.check-fade-enter-from,
.check-fade-leave-to {
    opacity: 0;
    transform: scale(0.5) rotate(-45deg);
}

.check-fade-enter-to,
.check-fade-leave-from {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

.mobile-search-enter-active,
.mobile-search-leave-active {
    transition: all 0.3s ease;
}

.mobile-search-enter-from,
.mobile-search-leave-to {
    opacity: 0;
    max-height: 0;
}

.mobile-search-enter-to,
.mobile-search-leave-from {
    opacity: 1;
    max-height: 200px;
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.page-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.loading-enter-active,
.loading-leave-active {
    transition: opacity 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
    opacity: 0;
}

.menu-icon-enter-active,
.menu-icon-leave-active,
.theme-icon-enter-active,
.theme-icon-leave-active {
    transition: all 0.2s ease;
}

.menu-icon-enter-from,
.menu-icon-leave-to,
.theme-icon-enter-from,
.theme-icon-leave-to {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scroll-top-enter-from,
.scroll-top-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 3px solid rgb(251 146 60);
    outline-offset: 2px;
}

/* Prevent layout shift */
.h-screen {
    height: 100vh;
    height: 100dvh;
}

/* Print styles */
@media print {
    aside,
    header {
        display: none !important;
    }
}

/* Mobile optimizations */
@media (max-width: 640px) {
    button,
    a {
        min-height: 44px;
        min-width: 44px;
    }
}
</style>
