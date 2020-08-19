<template>
  <v-container fluid>

    <CustomCard :item="event" v-for="(event,index) in filterEvents" :key="index"></CustomCard>

    <!-- TODO: show map? -->
    <!-- <div id="map"></div> -->

  </v-container>
</template>

<style scoped>
</style>

<script>
  import CustomCard from '../components/CustomCard'
  export default {
    name: 'profil',
    components: {
    CustomCard
  },
    data () {
      return {
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      user () {
        return this.$store.getters.user
      },
      filterEvents () {
        return this.events;
      }
    },
    created: function () {
      if (this.user && this.user.uid) {
      this.$store.dispatch('getEventsGoing')
      }
    },
    methods: {
      // TODO: Let click going only if is near by event
      // getLocation () {
      //   this.$store.dispatch('getLocation')
      // },
      // addGoing (index) {
      //   const distanta = (Math.sqrt(Math.pow((+this.coords.lat - 44.4336509), 2) + Math.pow((+this.coords.long - 26.0772394), 2)) * 100 * 1000)
      //   if (+distanta > 100) {
      //     this.$store.dispatch('Going', index)
      //     this.$store.dispatch('setPrezenti', index)
      //   }
      // }
    },
    mounted: function () {
      // const map = new window.google.maps.Map(document.getElementById('map'), {
      //   center: {lat: +this.coords.lat, lng: +this.coords.long},
      //   zoom: 16
      // })
      // var marker = new window.google.maps.Marker({
      //   position: {lat: +this.coords.lat, lng: +this.coords.long},
      //   map: map
      // })
    }
  }
</script>