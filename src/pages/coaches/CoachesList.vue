<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as a Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <!-- <li v-for="coach in filterdCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li> -->
      <coach-item
        v-for="coach in filterdCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>Sorry, there is no coach now!</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
export default {
  components: {
    CoachItem
  },
  computed: {
    filterdCoaches() {
      return this.$store.getters['coaches/coaches']; // becouse of using namespaced
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
