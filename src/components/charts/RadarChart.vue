<template>
  <div id="chart">
    <apex-chart ref="radar" type="radar" height="350" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script>
export default {
  props:{
    mouseMovementDurationFreq: null
  },
  data: function() {
    return { 
      series: [{
        name: 'Series 1',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radar',
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: '#e9e9e9',
              fill: {
                colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        title: {
          text: 'Mouse stagnant period duration (s) by frequency'
        },
        colors: ['#FF4560'],
        markers: {
          size: 4,
          colors: ['#fff'],
          strokeColor: '#FF4560',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val
            }
          }
        },
        xaxis: {
          categories: [],
          
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val
              } else {
                return ''
              }
            }
          }
        }
      },
    }
  },
  mounted() {
  },
  watch: {
    mouseMovementDurationFreq: function() {
      // console.log(newVal)
      if (this.mouseMovementDurationFreq) {
        this.$refs.radar.updateSeries([{
          name: 'Mouse movement duration by frequency',
          data: Object.values(this.mouseMovementDurationFreq)
        }])

        this.$refs.radar.updateOptions({
          xaxis: {
            categories: Object.keys(this.mouseMovementDurationFreq)
          }
        })
      } 
    }
  },
  computed: {
  },
  methods: {
    
  }
}
</script>
