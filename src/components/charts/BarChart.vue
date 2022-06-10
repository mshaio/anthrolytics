<template>
   <div>
     <apex-chart ref="bar" height="350" width="470" type="bar" :options="chartOptions" :series="series"></apex-chart>
   </div>
</template>

<script>
export default {
  props: {
    processedMouseData: null,
    gradientCountByType: null,
    magnitudeByFreq: null,
    chartTitle: null,
    barColors: []
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        title: {
          text: ''
        },
      },
      series: [{
        name: '',
        data: []
      }]
    }
  },
  mounted() {
  },
  watch: {
    // processedMouseData: function(newVal, oldVal) {
    //   this.processedMouseData.data ? console.log(this.processedMouseData) : '' 
    // }
    gradientCountByType: function() {
      if (this.gradientCountByType) {
        this.$refs.bar.updateSeries([{
          name: 'Mouse movement gradient count by type',
          data: this.gradientCountByType
        }])
        this.$refs.bar.updateOptions({
          xaxis:{
            categories: ['Positive', 'Neutral', 'Negative']
          },
          title: {
            text: this.chartTitle
          },
          colors: this.barColors
        })
      }
    },
    magnitudeByFreq: function() {
      console.log(this.chartTitle)
      if (this.magnitudeByFreq) {
        this.$refs.bar.updateSeries([{
          name: 'Mouse movement magnitude by frequency',
          data: Object.values(this.magnitudeByFreq)
        }])
        this.$refs.bar.updateOptions({
          xaxis: {
            categories: Object.keys(this.magnitudeByFreq)
          },
          title: {
            text: this.chartTitle
          },
          colors: this.barColors
        })
      }
    },
  }
};
</script>
