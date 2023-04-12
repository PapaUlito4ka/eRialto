import { Store } from "vuex";

export default new Store({
    state: {
        user: localStorage.user,
        accessToken: localStorage.accessToken,
        refreshToken: localStorage.refreshToken,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', user);
        },
        setAccessToken(state, token) {
            state.accessToken = token;
            localStorage.setItem('accessToken', token);
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
            localStorage.setItem('refreshToken', token);
        },
        clearUserSession(state) {
            state.user = state.accessToken = state.refreshToken = null;
            localStorage.clear();
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.user;
        }
    },
});