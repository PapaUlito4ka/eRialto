import { Store } from "vuex";

export default new Store({
    state: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAccessToken(state, token) {
            state.accessToken = token;
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
        },
        clearUserSession(state) {
            state.user = state.accessToken = state.refreshToken = null;
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.accessToken;
        }
    },
});