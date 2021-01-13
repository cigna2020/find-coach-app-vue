export default {
    async contactCoach(context, payload) {
        const newRequst = {
            // id: new Date().toISOString(),
            // coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message,
        };

        const response = await fetch(`https://vue-http-demo-5b114-default-rtdb.firebaseio.com/requsts/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequst)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send the request!');
            throw error;
        }

        newRequst.id = responseData.name;

        // it doesn't sended to the server, it needs to identify a coach locally
        newRequst.coachId = payload.coachId;

        context.commit('addRequest', newRequst);
    },
    async fetchRequests(context) {
        const coachId = context.rootState.userId;
        const response = await fetch(`https://vue-http-demo-5b114-default-rtdb.firebaseio.com/requsts/${coachId}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch the request!');
            throw error;
        }

        // transform the server data to work locally
        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request)
        }
        context.commit('setRequests', requests)
    }
} 