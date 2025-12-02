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
        // 1️⃣ Si l’utilisateur n’est pas connecté et va vers une page protégée
        if (to.meta.requiresAuth && !user) {
            next({ name: 'auth' });
        }
        // 2️⃣ Si l’utilisateur est connecté et essaie d’aller au login
        else if (to.name === 'auth' && user) {
            next({ name: 'home' });
        }
        // 3️⃣ Sinon, laisser passer
        else {
            next();
        }
    });
});

export default router;
