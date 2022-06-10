<template>
  <v-app>
    <v-container class="grey lighten-5 py-0 px-0 mx-3" fluid>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="12"
        >
          <v-card
            class=""
            tile
          >
          <app-bar/>
          </v-card>
        </v-col>
      </v-row>

      <v-row 
        v-for="n in 1"
        :key="n"
        no-gutters
        class='mt-3'
        justify="center">
        <v-card width="98%">
          <v-card-title class="text-h5">
            Mouse Location Heatmap
          </v-card-title>
          <div style="padding-left:6%;">
            <heat-map :mouseData="mouseData"/>
          </div>
          <v-card-subtitle>The heatmap indicates your mouse usable behaviour</v-card-subtitle>
          <v-card-actions>
            <!-- <v-btn text>
              Change Settings
            </v-btn> -->
            <pop-up class="ml-2 mb-2"/>
          </v-card-actions>
        </v-card>
      </v-row>

      <v-row justify="center">
        <v-col v-for="i in 2" :key="i">
          <v-card :class="i == 1? 'ml-3 mb-2' : 'mr-3 mb-2'">
            <polar-chart :mouseDirectionByFreq="mouseDirectionByFreq" v-if="i == 1"/>
            <line-chart v-else/>
          </v-card>
        </v-col>
      </v-row>

      <v-row
        :class="'mb-2'"
        no-gutters
      >
        <v-col
          v-for="k in 3"
          :key="k"
        >
          <v-card
            :class="k == 1 ? 'pa-2 ml-3' : 'pa-2 mr-3'"
            outlined
            tile
          >
            <bar-chart :gradientCountByType="gradientCountByType" :barColors="'#80DEEA'" :chartTitle='GRADIENT_BY_TYPE' v-if="k==1"/>
            <bar-chart :magnitudeByFreq="magnitudeByFreq" :barColors="'#80D8FF'" :chartTitle='MAGNITUDE_BY_FREQ' v-else-if="k==2"/>
            <radar-chart :mouseMovementDurationFreq="mouseMovementDurationFreq" v-else/>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-card class='pa-2 mx-6 mb-2' width="98%">
          <scatter-chart :mouseData="mouseData"/>
        </v-card>
      </v-row>

     </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import AppBar from '@/components/basic/AppBar.vue'
import HeatMap from '@/components/charts/HeatMap.vue'
import BarChart from '@/components/charts/BarChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import PolarChart from '@/components/charts/PolarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import ScatterChart from '@/components/charts/ScatterChart.vue'

import PopUp from '@/components/basic/PopUp.vue'

// import NavigationDrawer from '@/components/basic/NavigationDrawer.vue'
const GRADIENT_BY_TYPE = "Mouse Movement Gradient By Type Count"
const MAGNITUDE_BY_FREQ = "Mouse Movement Magnitude Category By Frequency"

export default {
  name: 'App',

  components: {
    AppBar,
    HeatMap,
    BarChart,
    RadarChart,
    PolarChart,
    LineChart,
    ScatterChart,
    PopUp
    // NavigationDrawer
  },

  data() {
    return {
      mouseData: {},
      processedMouseData: null,
      gradientCountByType: [],
      magnitudeByFreq: {},
      mouseMovementDurationFreq: {},
      mouseDirectionByFreq: {},
      GRADIENT_BY_TYPE,
      MAGNITUDE_BY_FREQ
    }
  },
  mounted() {
    this.fetchMouseData()
    this.fetchProcessedMouseData()
  },
  methods: {
    async fetchMouseData() {
      axios
        .get('http://127.0.0.1:8000/behaviour_core/mouse')
        .then(response => (this.mouseData = response))
        .catch(e => {
          console.log(e)
      })
    },
    async fetchProcessedMouseData() {
      axios
      .get('http://127.0.0.1:8000/behaviour_core/mouse?computed=true')
      .then(response => (this.processedMouseData = response))
      .catch(e => {
        console.log(e)
      })
    },
    getMouseGradientCountByType () {
      this.gradientCountByType = this.processedMouseData.data.gradient_count_by_type
      // console.log(this.gradientCountByType)
    },
    getMagnitudeByFreq() {
      this.magnitudeByFreq = this.processedMouseData.data.magnitude_by_frequency
    },
    getMouseMoveDurationFreq() {
      this.mouseMovementDurationFreq = this.processedMouseData.data.mouse_movement_duration_frequency
    },
    getMouseDirectionByFreq() {
      this.mouseDirectionByFreq = this.processedMouseData.data.direction_by_frequency
    }
  },
  watch: {
    processedMouseData: function() {
      if (this.processedMouseData.data) {
        // console.log("Ok")
        this.getMouseGradientCountByType()
        this.getMagnitudeByFreq()
        this.getMouseMoveDurationFreq()
        this.getMouseDirectionByFreq()
      }
      // this.processedMouseData.data ? this.getMouseGradientCountByType : console.log("Mouse gradient empty")
    }
  }
};
</script>
