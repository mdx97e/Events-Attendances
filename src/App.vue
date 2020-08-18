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
      temporary>
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
    <v-toolbar color="secondary">
      <div v-show="userIsAuthenticated" @click.stop="drawer = !drawer"></div>
      <v-toolbar-title class="white--text">Meeting App</v-toolbar-title>
      <v-spacer></v-spacer>
      <el-button type="text" v-if="!userIsAuthenticated" @click="loginDialog = true">Login</el-button>
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>

    <el-dialog
      title="Login"
      :visible.sync="loginDialog"
    >
      <v-form>
        <v-text-field
          label="Enter your E-mail"
          v-model="email2"
          :rules="[rules.required, rules.email]"
        >
        </v-text-field>
        <v-text-field
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          v-model="password"
          min="8"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]"
          counter
        >
        </v-text-field>
      </v-form>
      <v-alert :value="true" type="error" v-if="error !== null">
        Incorrect email or password. Please try again.
      </v-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialog = false">Cancel</el-button>
        <el-button @click="forgotPassword">Forgot password</el-button>
        <el-button type="primary" @click="userSignin">Confirm</el-button>
      </span>
    </el-dialog>
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
import firebase from "@/firebase";
export default {
  name: "App",
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      loginDialog: false,
      email: "",
      description: "",
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire",
        },
      ],
      miniVariant: false,
      // login part
      e1: true,
      password: "",
      email2: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
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
    // login part
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  mounted: function() {
    this.$store.dispatch("getLocation");
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
    },
    // login part
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
    forgotPassword() {
      this.loginDialog = false;
      const emailprompt = prompt("Introdu adresa de email", "");
      firebase
        .auth()
        .sendPasswordResetEmail(emailprompt)
        .then(function() {
          window.alert(
            "A fost trimis un email de recuperare a parolei la adresa: " +
              emailprompt
          );
        })
        .catch(function(error) {
          window.alert(error.message);
        });
    },
  },
};
</script>
