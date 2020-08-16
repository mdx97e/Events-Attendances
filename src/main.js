import Vue from 'vue'
import App from './App'
import * as firebase from './firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store,
  firebase,
  vuetify : new Vuetify(),
})
