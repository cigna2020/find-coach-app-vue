export default {
    addRequest(state, payload) {
        state.requests.push(payload);
        // console.log(payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    }
}