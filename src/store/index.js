import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import userInfo from './userInfo'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async fetchCurrency () {
      // const key = process.env.VUE_APP_FIXER
      // console.log(key)
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      // todo: can't get from .env - need to check
      const res = await fetch('http://data.fixer.io/api/latest?access_key=095e44f7189201324cc5473301a0265c&symbols=USD,EUR,UAH')
      return await res.json()
    }
  },
  modules: {
    auth, userInfo, category, record
  }
})
