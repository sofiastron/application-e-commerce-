import AuthPage from './components/auth.vue';
import HomePage from './components/home.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
    {
        path: '/',
        name: 'auth',        // la première page = login
        component: AuthPage
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: { requiresAuth: true } // page protégée
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Firebase Auth object
const firebaseAuth = getAuth();

router.beforeEach((to, from, next) => {
    onAuthStateChanged(firebaseAuth, (user) => {

        if (to.meta.requiresAuth && !user) {
            next({ name: 'auth' });
        }
       
        else if (to.name === 'auth' && user) {
            next({ name: 'home' });
        }

        else {
            next();
        }
    });
});

export default router;
