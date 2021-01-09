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
      <li v-for="coach in filterdCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>Sorry, there is no coach now!</h3>
  </section>
</template>

<script>
export default {
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
