import {createRouter, createWebHashHistory} from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import NotFound from './pages/NotFound';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id', component: CoachDetail,
            children: [{path: 'contact', component: ContactCoach}] // /coaches/c1/contact'
        },
        {path: '/register', component: CoachRegistration},
        {path: '/reguests', component: RequestsReceived},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});

export default router;