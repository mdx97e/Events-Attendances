<template>
  <v-app>
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item>Meeting App</el-menu-item>
      <el-menu-item @click="loginSignupDialog = true">Login / SignUp</el-menu-item>
    </el-menu>

    <v-main>
      <router-view />
    </v-main>

    <el-dialog :title="signInActivated ? 'Login' : 'Sign up'" :visible.sync="loginSignupDialog">
      <v-form v-if="signInActivated" class="custom-form">
        <el-input placeholder="Email" v-model="emailLogin"></el-input>
        <el-input
          placeholder="Password"
          v-model="passwordLogin"
          show-password
        ></el-input>
        <v-alert :value="true" type="error" v-if="error !== null">
          Incorrect email or password. Please try again.
        </v-alert>
        <a @click="forgotPassword" class="forgot-password">Forgot password?</a>
        <el-button type="primary" @click="userSignin">Sign in</el-button>
      </v-form>
      <div class="no-content" v-if="signInActivated">
        <div class="dialog-description-form">You don't have an account?</div>
        <el-button @click="signInActivated = false"
          >Sign up</el-button
        >
      </div>
      <div class="no-content" v-if="!signInActivated">
        <div class="dialog-description-form">Do you have an account?</div>
        <el-button @click="signInActivated = true"
          >Sign in</el-button
        >
      </div>
      <v-form v-if="!signInActivated" class="custom-form">
        <el-input placeholder="Name" v-model="numeSignUp"></el-input>
        <el-input placeholder="Surname" v-model="prenumeSignUp"></el-input>
        <el-input placeholder="Email" v-model="email2"></el-input>
        <el-input
          placeholder="Password"
          v-model="passwordSignUp"
          show-password
        ></el-input>
        <el-button type="primary" @click="userSignUp">Sign Up</el-button>
      </v-form>
    </el-dialog>
  </v-app>
</template>

<style>
.el-dialog__body {
  display: flex;
  flex-flow: row;
  padding: 0px !important;
  height: 50vh !important;
}
.el-dialog {
  background-size: cover !important;
  background-image: url('./assets/singinbackground.jpeg') !important;
  height: 50%;
  width: 50%;
}
.el-dialog__title {
  color:white !important;
}
form {
  width: 50%;
  height: 100%;
  text-align: -webkit-center;
}
.dialog-description-form {
  color: white;
  padding-bottom: 10px;
  font-size: 1.3rem;
}
.custom-form {
  background-color: white;
  padding: 34px;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.el-input {
  padding: 5px;
}
.forgot-password {
  padding: 10px 0px;
}
.el-button {
  width: 50%;
}
.no-content {
  display: flex;
  flex-flow: column;
  margin-top: -10%;
  align-items: center;
  justify-content: center;
  padding: 34px;
  width: 50%;
}
</style>

<script>
import firebase from "@/firebase";
export default {
  name: "App",
  data() {
    return {
      clipped: true,
      signInActivated: true,
      drawer: false,
      fixed: false,
      loginSignupDialog: false,
      email: "",
      description: "",
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire",
        },
      ],
      miniVariant: false,
      showPasswordIcon: true,
      passwordLogin: "",
      emailLogin: "",
      showPasswordIcon2: true,
      passwordSignUp: "",
      email2: "",
      numeSignUp: null,
      prenumeSignUp: null,
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
    // signup part
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
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
    // signup part
    userSignUp() {
      this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password,
        nume: this.nume,
        prenume: this.prenume,
      });
    },
  },
};
</script>
