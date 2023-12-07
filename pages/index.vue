<template>
<div>
    Hello From index Page 
</div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
import { useAuthStore } from '@/stores/authStore'

const projectsStore = useProjectsStore();
const authStore = useAuthStore();




</script>