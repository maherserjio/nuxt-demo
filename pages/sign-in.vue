<template >
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
            <h1 class="text-2xl font-bold text-center">Log in to your account</h1>
            <form class="space-y-6" @submit="handleSubmit">
                <div>
                    <label for="email" class="text-sm font-semibold">Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="Email"
                        class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div>
                    <label for="password" class="text-sm font-semibold">Password</label>
                    <input type="password" id="password" v-model="password" required placeholder="Password"
                        class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <button type="submit"
                    class="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Sign in
                </button>
                <hr>
                <div class="text-sm text-gray-600">
                    <p class="pb-2">Don't you have an account?</p>
                    <NuxtLink to="https://sat7plus.org/auth/sign-up"
                        class="block font-semibold mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 mr-4">
                        Click To Register
                    </NuxtLink>

                </div>

            </form>
        </div>
    </div>
</template>

<script >
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
    data() { return { isLoggedIn: false, email: '', password: '' } }
    , methods: {
        handleSubmit(event) {
            const authStore = useAuthStore();
            event.preventDefault();
            const { email, password } = this;
            authStore.signIn(email, password, this.$router);
        }
    }
    , mounted() {
        // Watch Effect Not Trigering probably due to another pinia instance 
        // Favorite page needs call to favorites api to retrieve data + adding the swiper 
        watchEffect(() => {
            const authStore = useAuthStore();
            // Access the useAuthStore.getIsLoggedIn  property from the store 
            this.isLoggedIn = authStore.getIsLoggedIn;
            // console.log('authStore.getIsLoggedIn from Navbar==>', useAuthStore.getIsLoggedIn())
        });
    }
});


</script>
// add to favorites
<!-- https://sat7.faulio.com/api/v1/member/favorites/add?program=1137 -->

// remove from favorites

<!-- https://sat7.faulio.com/api/v1/member/favorites/remove?program=1137 -->