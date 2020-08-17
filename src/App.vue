<template>
  <v-app>
    <v-navigation-drawer
      v-show="userIsAuthenticated"
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      temporary
    >
      <div id="text" v-if="admin === false">
        <h1>Welcome</h1>
        <v-flex xs12>
          <v-progress-circular
            :size="110"
            :width="15"
            :rotate="360"
            :value="value"
            :color="color"
          >
            {{ value }} %
          </v-progress-circular>
        </v-flex>
        <v-flex xs12>
          {{ totalParticipari }} events out of {{ totalEvents }}
        </v-flex>
      </div>
      <v-flex xs12>
        <v-list-item router to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-flex>
      <v-flex xs12>
        <v-list-item router to="/profile">
          <v-list-item-action>
            <v-icon>account_circle</v-icon>
          </v-list-item-action>
          <v-list-item-title>Account info</v-list-item-title>
        </v-list-item>
      </v-flex>
      <v-flex xs12>
        <v-list-item router to="/createMeetup" v-if="admin === true">
          <v-list-item-action>
            <v-icon>card_travel</v-icon>
          </v-list-item-action>
          <v-list-item-title>Create meetup</v-list-item-title>
        </v-list-item>
      </v-flex>
      <v-flex xs12>
        <v-list-item router to="/statistics" v-if="admin === true">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-title>Statistics</v-list-item-title>
        </v-list-item>
      </v-flex>
      <v-flex xs12>
        <v-list-item @click="onSignOut">
          <v-list-item-action>
            <v-icon>clear</v-icon>
          </v-list-item-action>
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-flex>
      <v-list>
        <v-list-item value="true" v-for="(item, i) in items" :key="i">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <div v-show="userIsAuthenticated" @click.stop="drawer = !drawer"></div>
      <v-toolbar-title class="white--text">Meeting App</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
a,
ul,
li {
  text-decoration: none;
  list-style-type: none;
}
#text {
  margin: 0;
  padding: 10% 0% 10% 0%;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      email: "",
      description: "",
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire",
        },
      ],
      miniVariant: false,
    };
  },
  name: "App",
  created: function() {
    this.$store.dispatch("readEvents");
    this.$store.dispatch("AuthChange");
    this.$store.dispatch("getUserData");
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    admin() {
      return this.$store.getters.admin;
    },
    totalEvents() {
      return this.$store.getters.events.length;
    },
    totalParticipari() {
      return this.$store.getters.eventsGoing.length;
    },
    value() {
      return Math.floor((this.totalParticipari * 100) / this.totalEvents);
    },
    color() {
      if (this.value < 30) return "red";
      if (this.value < 60) return "green";
      if (this.value < 80) return "blue";
      return "yellow";
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    location() {
      return this.$store.getters.location;
    },
  },
  mounted: function() {
    this.$store.dispatch("getLocation");
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>
