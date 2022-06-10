import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apex-chart', VueApexCharts)

// import { createApp } from 'vue'
import { store } from '@/store/store'

// const app = createApp({ App })
// app.use(store)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
