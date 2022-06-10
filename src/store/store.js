import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    numberOfDataPoints: 12
  },
  getters: {
    getNumberOfDataPoints: state => state.numberOfDataPoints
  },
  mutations: {
    changeNumberOfDataPoints(state, number) {
      state.numberOfDataPoints = number
    }
  },
  actions: {
  },
  modules: {

  }
})