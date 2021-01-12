<template>
  <section>
    <base-card>
      <header>
        <h2 v-if="hasRequests">Requests Received</h2>
      </header>
      <ul>
        <RequestItem
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></RequestItem>
      </ul>
      <h3 v-if="!hasRequests">You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
export default {
  components: {
    RequestItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/request'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
