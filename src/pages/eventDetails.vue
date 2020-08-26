<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <p>{{ eventDetails.avatar }}</p>
      {{ eventDetails.data }}
          <p>{{ eventDetails.titlu }}</p>
          <p>{{ eventDetails.descriere }}</p>
          {{ eventDetails.participatingUsers }}
          <v-btn color="primary" router to="/">Back</v-btn>
    </v-flex>
  </v-layout>
</template>

<style scoped>
</style>

<script>
export default {
  name: "events",
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    eventDetails() {
      return this.$store.getters.currentEventDetails;
    },
    userUID() {
      return this.$store.getters.userUID;
    }
  },
  mounted() {
    this.$store.dispatch('getEventDetails', this.id);
  }
};
</script>
