import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Logout from '../views/Logout.vue';
import Products from '../views/Products.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/sign-in', name: 'SignIn', component: SignIn },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/products', name: 'Products', component: Products },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router