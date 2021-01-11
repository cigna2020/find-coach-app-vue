export default {
    ContactCoach(context, payload) {
        const newRequst = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message,
        };
        context.commit('addRequest', newRequst);
    }
}