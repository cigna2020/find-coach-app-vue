import {createRouter, createWebHistory} from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import UserAuth from './pages/auth/UserAuth';
import NotFound from './pages/NotFound';
import store from './store/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id', component: CoachDetail, props: true,
            children: [{path: 'contact', component: ContactCoach}] // /coaches/c1/contact'
        },
        // meta uses to protect link, look router.beforeEach below
        {path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
        {path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
        {path: '/:notFound(.*)', component: NotFound},
    ]
});

router.beforeEach(function (to, _, next) {  // _ - from, does't use in this case
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;