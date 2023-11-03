import { defineStore } from "pinia";
import Helpers from '@/global/helpers';
import Rest from '@/global/rest';

const rest = new Rest('/api/auth').Api();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authenticated: false,
        authUser: null
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async checkLogin() {
            const _xa = sessionStorage.getItem("_xa");
            const _us = sessionStorage.getItem("_us");
            if (_xa) {
                const user = JSON.parse(Helpers.dec(_us, 1, 6));
                this.authUser = user;
                this.authenticated = true;
            }
        },
        
        async getProfile() {
            try {
                const response = await rest.get('/user-profile');
                this.authUser = response.data;
                this.authenticated = true;
                sessionStorage.setItem('_us', Helpers.enc(JSON.stringify(response.data), 1, 6));
            } catch (error) {
                this.authUser = null
                this.authenticated = false
            }
        },
        logout() {
            sessionStorage.removeItem("_xa");
            sessionStorage.removeItem("_us");
            this.authUser = null
            this.authenticated = false
        }
    }
})