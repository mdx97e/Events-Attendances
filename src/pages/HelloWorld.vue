<template>
  <v-container fluid class="hello-world-wrapper">
    <div class="filters-wrapper">
      <div class="grid-title">Upcoming events</div>
      <div class="filters">
        <el-input
          placeholder="Search for ..."
          v-model="textFilter"
          clearable>
        </el-input>
        <el-select v-model="timelineFilter" placeholder="Select when">
          <el-option
            v-for="item in optionsTimeline"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="cards-wrapper">
    <CustomCard
      :item="event"
      v-for="(event, index) in filterEvents"
      :key="index"
    ></CustomCard>
    </div>
    <!-- TODO: show map? -->
    <!-- <div id="map"></div> -->
  </v-container>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
.cards-wrapper {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
      margin: 0px 10%;
}
.hello-world-wrapper {
  display: flex;
  flex-flow: column;
}
.filters-wrapper {
  display: flex;
  margin: 0px 10%;
  justify-content: space-between;
}
.filters {
  display: flex;
  width: 50%;
}
.grid-title {
      align-self: center;
    font-size: 2rem;
    font-family: serif;
}
</style>

<script>
import CustomCard from "../components/CustomCard";
import * as moment from 'moment';
export default {
  name: "profil",
  components: {
    CustomCard,
  },
  data() {
    return {
      optionsTimeline: [
        { value: 'past', label: 'Past events' },
        { value: 'thisweek', label: 'This week' },
        { value: 'nextweek', label: 'Next week' },
        { value: 'future', label: 'Future events' },
        { value: 'anytime', label: 'Anytime' }
      ],
      timelineFilter: 'anytime',
      textFilter: ''
    };
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    user() {
      return this.$store.getters.userUID;
    },
    filterEvents() {

      return this.events.filter(item => this.titleAndDescriptionFilter(item) && this.dateFilter(item.data));
    },
  },
  created: function() {
    if (this.user && this.user.uid) {
      this.$store.dispatch("getEventsGoing");
    }
  },
  methods: {
    titleAndDescriptionFilter(item) {
      let textToSearch = this.textFilter.toLowerCase();
      return item.titlu.toLowerCase().includes(textToSearch) || item.descriere.toLowerCase().includes(textToSearch);
    },
    dateFilter(date) {
      switch (this.timelineFilter) {
        case 'anytime': return true;
        case 'past': return moment(date).isBefore(new Date());
        case 'thisweek': return moment().isoWeek() == moment(date).isoWeek();
        case 'nextweek': return moment().isoWeek() == (moment(date).isoWeek() + 1);
        case 'future': return moment(date).isSameOrAfter(new Date());
      }
    }
  },
  mounted: function() {
    // const map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: +this.coords.lat, lng: +this.coords.long},
    //   zoom: 16
    // })
    // var marker = new window.google.maps.Marker({
    //   position: {lat: +this.coords.lat, lng: +this.coords.long},
    //   map: map
    // })
  },
};
</script>
