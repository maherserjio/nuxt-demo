<template >
    <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-12">
            <span class="font-semibold text-xl tracking-tight">WPS</span>
        </div>
        <div class="block lg:hidden">
            <button @click="toggleNavbar"
                class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>

        <div :class="{ 'hidden': !isNavbarOpen }" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div v-if="isLoggedIn" class="text-sm lg:flex-grow">
                <NuxtLink to="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    Home
                </NuxtLink>
                <NuxtLink to="/favorites" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    Favorites
                </NuxtLink>
                <NuxtLink @click="authStore.signOut" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
                    Sign Out
                </NuxtLink>
            </div>
            <div v-else class="text-sm lg:flex-grow">
                <NuxtLink to="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    Home
                </NuxtLink>
                <NuxtLink to="/sign-in" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
                    Sign In
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script >
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        let isLoggedIn = authStore.getIsLoggedIn;
    },
    data() { 
        const authStore = useAuthStore();
        return { isNavbarOpen: false, isLoggedIn: false , authStore } 
    }
    , methods: { toggleNavbar() { this.isNavbarOpen = !this.isNavbarOpen; } }
    , mounted() {
        const authStore = useAuthStore();
        watchEffect(() => {
             this.isLoggedIn = authStore.getIsLoggedIn;
             console.log('authStore.getIsLoggedIn from Navbar==>', authStore.getIsLoggedIn)
        });
    }
});


</script>
