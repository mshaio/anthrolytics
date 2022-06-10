<template>
  <div id="chart">
    <apex-chart ref="polar" type="polarArea" height="362" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script>

export default {
  props:{
    mouseDirectionByFreq: null
  },
  data() {
    return {
      series: [0,0,0,0],
      chartOptions: {
        chart: {
          type: 'polarArea',
        },
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        labels: ["0° - 90°","90° - 180°","180° - 270°","270° - 360"]
      }
    }
  },
  watch: {
    mouseDirectionByFreq: function() {
      if (this.mouseDirectionByFreq) {
        console.log(Object.values(this.mouseDirectionByFreq))
        this.$refs.polar.updateSeries(Object.values(this.mouseDirectionByFreq))
      }
    }
  }
}
</script>
