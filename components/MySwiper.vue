<template>
    <div>
        <Swiper :height="300" :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="2" :loop="true"
            :effect="'creative'" :autoplay="{
                delay: 8000,
                disableOnInteraction: true,
            }" :creative-effect="{
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
    },
    next: {
        translate: ['100%', 0, 0],
    },
}">
            <SwiperSlide v-for="(project, id) in projects" :key="project.id"
                :style="`background-image: url(${project.allimages.square.fullhd});background-repeat:no-repeat;background-size:cover;`">
                <div 
                    class="flex flex-col  items-center justify-center text-center text-white text-sm sm:text-sm md:text-xl ">
                    <div v-if="isLoggedIn">
                        <button v-if="!project.favorite"
                        class="mt-2 text-sm sm:text-sm md:text-xl  bg-transparent hover:bg-[#1F2937] text-white font-semibold hover:text-white py-2 px-4 border border-[#1F2937] hover:border-transparent rounded">
                        Add to Favorite
                    </button>
                    <button v-if="project.favorite"
                        class="mt-2 text-sm sm:text-sm md:text-xl  bg-transparent hover:bg-[#1F2937] text-white font-semibold hover:text-white py-2 px-4 border border-[#1F2937] hover:border-transparent rounded">
                        Remove from Favorite
                    </button>
                    </div>
                    <h3 class="mt-2">{{ project.title }}</h3>
                </div>
            </SwiperSlide>
            <SwiperControls />
        </Swiper>
    </div>
</template>
  

<script >
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
    data() { return {} }
    , props: {
        projects: {
            type: Array,
            required: true,
        },
        isLoggedIn: {
            type: Boolean,
            required: false,
        },
    },
});
</script>
  


<style>
.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 80vh;
    font-weight: bold;
}

.swiper-wrapper {
    min-width: 100vh;
    width: 100vh;
}
</style>
  