<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <button class="swiper-button-next " @click="swiper.slideNext()"></button>
  <button class="swiper-button-prev " @click="swiper.slidePrev()"></button>
</template>


<style>

.swiper-button-prev {
  color: #fff;
}

.swiper-button-next {
  color: #fff;
}

</style>