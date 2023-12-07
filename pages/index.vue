<template >
  <div>
    <MySwiper :isLoggedIn="isLoggedIn" :projects="projects"></MySwiper>
  </div>
</template>
  
<script>
import { useAuthStore } from '@/stores/authStore'
import { useProjectsStore } from '@/stores/projectsStore'
export default defineComponent({
  data() {
    return {
      projects: [],
      isLoggedIn: false
    }
  },
  async mounted() {
    const authStore = useAuthStore();
    let isLoggedIn = authStore.getIsLoggedIn;

    const projectsStore = useProjectsStore();
    await projectsStore.fetchProjects();
    this.projects = projectsStore.getProjects;

    watchEffect(() => {
      const authStore = useAuthStore();
      // Access the authStore.getIsLoggedIn  property from the store 
      this.isLoggedIn = authStore.getIsLoggedIn;
    });
  }
})
</script>
  
    