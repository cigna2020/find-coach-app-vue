let timer;

export default {

    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDatrNRv_450ndF0EMEIECJEL_l1DMysgs'
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDatrNRv_450ndF0EMEIECJEL_l1DMysgs'
        }

        const response = await fetch(
            url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate.');
            throw error;
        }

        const expiresIn = +responseData.expiresIn * 1000; // Количество секунд (3600), через которые истекает срок действия токена ID.
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            // tokenExpiration: expirationDate,
        });
    },

    async login(context, payload) {
        context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },

    async signup(context, payload) {
        context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },

    async autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                // tokenExpiration: null,
            })
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            // tokenExpiration: null
        })
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
}