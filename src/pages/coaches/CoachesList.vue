<template>
  <!-- !! returns boolean -->
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button link to="/register" v-if="!isCoach && !isLoading"
          >Register as a Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
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
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filterdCoaches() {
      //   return this.$store.getters['coaches/coaches']; // becouse of using namespaced
      const coaches = this.$store.getters['coaches/coaches']; // use CoachFilter
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        } else {
          return false;
        }
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    }
  },
  created() {
    // to call the method automatically
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
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
