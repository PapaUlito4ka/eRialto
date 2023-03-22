import { Store } from "vuex";

export default new Store({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    },
});