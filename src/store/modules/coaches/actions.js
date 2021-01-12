export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        // async/await in order not to use .then()/.catch()
        const response = await fetch(`https://vue-http-demo-5b114-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // consts responseData = await response.json();

        if (!response.ok) {
            // error ...
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },

    async loadCoaches(context) {
        const response = await fetch(`https://vue-http-demo-5b114-default-rtdb.firebaseio.com/coaches.jso`);
        const responseData = await response.json()

        if (!response.ok) {
            // error ...
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach);
            // console.log(responseData);

        }

        context.commit('setCoaches', coaches);
    }
};