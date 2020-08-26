import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    fb: {
      db: firebase.database()
    },
    userUID: null,
    keysEvents: [],
    userdetails: null,
    eventsGoing: [],
    image: null,
    uploadPicture: [],
    error: null,
    loginSignupDialog: false,

  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    setUserDetails(state, payload) {
      state.userdetails = payload
    },
    setUserUID(state, payload) {
      state.userUID = payload
    },
    getEvents: (state, payload) => {
      state.events.push(payload)
    },
    getKeys: (state, payload) => {
      state.keysEvents = payload
    },
    eventsGoing: (state, payload) => {
      state.eventsGoing = payload
    },
    uploadPicture(state, payload) {
      state.uploadPicture.push(payload)
    },
    emptyEvents: (state) => {
      state.events = []
    },
    emptyGoing: (state) => {
      state.eventsGoing = []
    },
    setLoginSignupDialog: (state, payload) => {
      state.loginSignupDialog = payload
    },
  },
  actions: {
    readEvents({ commit }) {
      return firebase.database().ref('events')
        .on('value', snap => {
          commit('emptyEvents')
          const myObj = snap.val()
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            var eventdetails = {}
            eventdetails.avatar = myObj[key].avatar
            eventdetails.descriere = myObj[key].descriere
            eventdetails.id = key
            eventdetails.prezenta = myObj[key].prezenta
            eventdetails.titlu = myObj[key].titlu
            eventdetails.data = new Date(myObj[key].data)
            eventdetails.prezenti = myObj[key].prezenti
            commit('getEvents', eventdetails)
          })
          commit('getKeys', keys)
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    signUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setUserUID', user.user.uid)
            commit('setLoginSignupDialog', false)
            this.dispatch('getUserDetails');
            firebase.database().ref('/users/' + user.user.uid).set({
              nume: payload.nume,
              prenume: payload.prenume,
              email: payload.email,
              image: '',
              attendings: ''
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setUserUID', user.user.uid)
            commit('setLoginSignupDialog', false)
            this.dispatch('getUserDetails');
          })
        .catch(
          error => {
            commit('setError', error)
          }
        )
    },
    addAttendingToMeeting({ commit }, payload) {
      console.log(commit)
      firebase.database().ref('/users/' + payload.userId + '/attendings/' + payload.meetingId).set(true);
      firebase.database().ref('/events/' + payload.meetingId + '/participants/' + payload.userId).set(true);
    },
    getUserDetails({ commit }) {
      if (this.state && this.state.userUID) {
        firebase.database().ref('/users/' + this.state.userUID).on('value', snap => {
          commit('setUserDetails', snap.val());
        })
      } else {
        commit('setUserDetails', null);
      }
    },
    AuthChange({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUserUID', user.uid);
          this.dispatch('getUserDetails');
        } else {
          commit('setUserUID', null)
        }
      })
    },
    signOut({ commit }) {
      firebase.auth().signOut().then(function () {
        commit('setUserUID', null)
        this.dispatch('getUserDetails');
      }).catch(
        error => {
          console.log(error)
        })
    },
    loginSignupDialog({ commit }, payload) {
        commit('setLoginSignupDialog', payload)
    },
  },
  getters: {
    events: state => state.events,
    userUID: state => state.userUID,
    userdetails: state => state.userdetails,
    keysEvents: state => state.keysEvents,
    eventsGoing: state => state.eventsGoing,
    uploadPicture: state => state.uploadPicture,
    error: state => state.error,
    loginSignupDialog: state => state.loginSignupDialog
  }
})
