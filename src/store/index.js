import {createStore} from 'vuex';

import coachesModule from './modules/coaches/index';

const store = createStore({
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    },
    modules: {
        coaches: coachesModule
    }
});

export default store;