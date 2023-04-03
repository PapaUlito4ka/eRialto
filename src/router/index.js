import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Logout from '../views/Logout.vue';
import Search from '../views/Search.vue';
import store from '../store';

const routes = [
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/sign-in', name: 'SignIn', component: SignIn },

    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/logout', name: 'Logout', component: Logout, meta: { requiresAuth: true } },
    { path: '/search', name: 'Search', component: Search, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router