<template>
  <TheHeader></TheHeader>
  <router-view v-slot="slotProps">
    <transition name="rout" mode="in-out">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('autoLogin');
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.rout-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.rout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.rout-enter-active {
  transition: all 0.3s ease-out;
}
.rout-leave-active {
  transition: all 0.3s ease-in;
}

.rout-enter-to,
.rout-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
