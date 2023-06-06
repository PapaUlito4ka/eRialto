import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/profile/Profile.vue';
import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import Logout from '../views/auth/Logout.vue';
import Search from '../views/product/Search.vue';
import Product from '../views/product/Product.vue';
import CreateProduct from '../views/product/CreateProduct.vue';
import MyProducts from '../views/profile/Products.vue';
import MyReviews from '../views/profile/Reviews.vue';
import Favourites from '../views/profile/Favourites.vue';
import Messages from '../views/profile/Messages.vue';
import Notifications from '../views/profile/Notifications.vue';
import store from '../store';

const routes = [
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/sign-in', name: 'SignIn', component: SignIn },

    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/logout', name: 'Logout', component: Logout, meta: { requiresAuth: true } },
    { path: '/search', name: 'Search', component: Search, meta: { requiresAuth: true } },
    { path: '/products/:id', name: 'Product', component: Product, meta: { requiresAuth: true } },
    { path: '/create-product', name: 'CreateProduct', component: CreateProduct, meta: { requiresAuth: true } },

    // Profile routes
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/profile/products', name: 'MyProducts', component: MyProducts, meta: { requiresAuth: true } },
    { path: '/profile/reviews', name: 'Reviews', component: MyReviews, meta: { requiresAuth: true } },
    { path: '/profile/favourites', name: 'Favourites', component: Favourites, meta: { requiresAuth: true } },
    { path: '/profile/messages', name: 'Messages', component: Messages, meta: { requiresAuth: true } },
    { path: '/profile/notifications', name: 'Notifications', component: Notifications, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.user) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        if (store.state.user) {
            next({ name: 'Home' });
        } else {
            next();
        }
    }
});

export default router