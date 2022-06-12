import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    numberOfDataPoints: 1000
  },
  getters: {
    getNumberOfVisualDataPoints: state => state.numberOfDataPoints
  },
  mutations: {
    changeNumberOfDataPoints(state, number) {
      console.log(state)
      state.numberOfDataPoints = number
    }
  },
  actions: {
  },
  modules: {

  }
})