<template>
  <v-app>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item @click="openLoginSignupDialog" v-if="!userIsAuthenticated">Login / SignUp</el-menu-item>
      <el-menu-item v-if="userIsAuthenticated">
        <el-dropdown @command="handleAvatarDropdown">
          <el-avatar size="medium" :src="circleUrl"></el-avatar>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goToProfilePage">Profile</el-dropdown-item>
            <el-dropdown-item command="signOut">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>

    <v-main>
      <router-view />
    </v-main>

    <el-dialog :title="signInActivated ? 'Login' : 'Sign up'" :visible.sync="loginSignupDialog">
      <v-form v-if="signInActivated" class="custom-form">
        <el-input placeholder="Email" v-model="emailLogin"></el-input>
        <el-input placeholder="Password" v-model="passwordLogin" show-password></el-input>
        <v-alert
          :value="true"
          type="error"
          v-if="error !== null"
        >Incorrect email or password. Please try again.</v-alert>
        <a @click="forgotPassword" class="forgot-password">Forgot password?</a>
        <el-button plain type="primary" @click="userSignin">Sign in</el-button>
      </v-form>
      <div class="no-content" v-if="signInActivated">
        <div class="dialog-description-form">You don't have an account?</div>
        <el-button plain @click="signInActivated = false">Sign up</el-button>
      </div>
      <div class="no-content" v-if="!signInActivated">
        <div class="dialog-description-form">Do you have an account?</div>
        <el-button plain @click="signInActivated = true">Sign in</el-button>
      </div>
      <v-form v-if="!signInActivated" class="custom-form">
        <el-input placeholder="Name" v-model="numeSignUp"></el-input>
        <el-input placeholder="Surname" v-model="prenumeSignUp"></el-input>
        <el-input placeholder="Email" v-model="emailSignUp"></el-input>
        <el-input placeholder="Password" v-model="passwordSignUp" show-password></el-input>
        <el-button plain type="primary" @click="userSignUp">Sign Up</el-button>
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
  background-image: url("./assets/singinbackground.jpeg") !important;
  height: 50%;
  width: 50%;
}
.el-dialog__title {
  color: white !important;
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
.low-opacity-text {
  opacity: 0.5;
}
.el-input {
  padding: 5px;
}
.forgot-password {
  padding: 10px 0px;
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
import router from "./router";
export default {
  name: "App",
  data() {
    return {
      clipped: true,
      signInActivated: true,
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
      showPasswordIcon: true,
      passwordLogin: "",
      emailLogin: "",
      showPasswordIcon2: true,
      passwordSignUp: "",
      emailSignUp: "",
      numeSignUp: null,
      prenumeSignUp: null,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created: function () {
    this.$store.dispatch("readEvents");
    this.$store.dispatch("AuthChange");
    this.$store.dispatch("getUserDetails");
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    totalEvents() {
      return this.$store.getters.events.length;
    },
    totalAttendings() {
      return this.$store.getters.eventsGoing.length;
    },
    value() {
      return Math.floor((this.totalAttendings * 100) / this.totalEvents);
    },
    color() {
      if (this.value < 30) return "red";
      if (this.value < 60) return "green";
      if (this.value < 80) return "blue";
      return "yellow";
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.userUID !== null &&
        this.$store.getters.userUID !== undefined
      );
    },
    loginSignupDialog() {
      return this.$store.getters.loginSignupDialog;
    },
    // login part
    user() {
      return this.$store.getters.userUID;
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
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
    },
    // login part
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.emailLogin,
        password: this.passwordLogin,
      });
    },
    forgotPassword() {
      this.loginDialog = false;
      const emailprompt = prompt("Introdu adresa de email", "");
      firebase
        .auth()
        .sendPasswordResetEmail(emailprompt)
        .then(function () {
          window.alert(
            "A fost trimis un email de recuperare a parolei la adresa: " +
              emailprompt
          );
        })
        .catch(function (error) {
          window.alert(error.message);
        });
    },
    // signup part
    userSignUp() {
      this.$store.dispatch("signUp", {
        email: this.emailSignUp,
        password: this.passwordSignUp,
        nume: this.numeSignUp,
        prenume: this.prenumeSignUp,
      });
    },
    openLoginSignupDialog() {
      this.$store.dispatch("loginSignupDialog", true);
    },
    handleAvatarDropdown(command) {
      switch (command) {
        case "goToProfilePage":
          router.push("/profile");
          break;
        case "signOut":
          this.onSignOut();
          break;
      }
    },
  },
};
</script>
