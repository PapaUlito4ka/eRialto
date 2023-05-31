import { Store } from "vuex";

export default new Store({
    state: {
        user: localStorage.user,
        accessToken: localStorage.accessToken,
        refreshToken: localStorage.refreshToken,
    },
    mutations: {
        setUser(state, user) {
            state.user = JSON.stringify(user);
            localStorage.setItem('user', JSON.stringify(user));
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
        },
        getFirstname(state) {
            let user = JSON.parse(state.user);
            return user.profile.firstname;
        },
        getFullname(state) {
            let user = JSON.parse(state.user);
            return user.profile.firstname + ' ' + user.profile.lastname;
        },
        getUserId(state) {
            let user = JSON.parse(state.user);
            return user.id;
        },
        getAccessToken(state) {
            return state.accessToken;
        },
        getRefreshToken(state) {
            return state.refreshToken;
        }
    },
});