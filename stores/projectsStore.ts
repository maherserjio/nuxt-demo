import { defineStore } from "pinia";
import { useApi } from "../composables/useApi";

export const useProjectsStore = defineStore("projects", {
    state: () => ({
        projects: [],
        loading: false,
    }),

    getters: {
        getProjects: (state) => state.projects,
        getIsLoading: (state) => state.loading,
    },

    actions: {
        async fetchProjects() {
            this.projects = [];
            this.loading = true;
            const api = useApi();
            await api({
                method: 'get',
                url: '/home'
            }).then((res) => {
                this.projects = res.data.blocks.find((block: { title: string; }) => {
                    return block.title === 'Top Programs'
                }).projects;
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false;
            })
        },
    },

});
