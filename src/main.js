import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltipDirective', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

// todo: move config to gitignore config file
const firebaseConfig = {
  apiKey: 'AIzaSyDkZpXaFuaa72t3GpJhRjWp_W8YaWpMnoI',
  authDomain: 'vue-personal-accountant.firebaseapp.com',
  databaseURL: 'https://vue-personal-accountant.firebaseio.com',
  projectId: 'vue-personal-accountant',
  storageBucket: 'vue-personal-accountant.appspot.com',
  messagingSenderId: '643335573654',
  appId: '1:643335573654:web:347b3eaa93da63c96632b7'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
