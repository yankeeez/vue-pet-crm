import firebase from 'firebase/app'

export default {
  state: {
    userInfo: {}
  },
  actions: {
    async fetchUserInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setUserInfo', info)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    getUserInfo: s => s.userInfo
  },
  mutations: {
    setUserInfo (state, info) {
      state.userInfo = info
    },
    clearInfo (state) {
      state.userInfo = {}
    }
  }
}
