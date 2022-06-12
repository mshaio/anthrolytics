<template>
  <div id="chart">
      <!-- {{mouseData}} -->
      <!-- {{bendfordsDistribution}} -->
      <!-- {{xlabels}} -->
      <!-- {{getNumberOfDataPoints()}} -->
      <!-- {{heatmapData}} -->
    <apex-chart ref="heatmap" type="heatmap" height="550" width="1200" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    props: {
        mouseData: null,
    },
    data: function() {
      return {
        // mouseData1: Object,
        bendfordsDistribution: new Array(10).fill(0), 
        xMax: 0,
        yMax:0,
        heatmapData: [],
        series: [],
        chartOptions: {
            chart: {
                height: 350,
                type: 'heatmap',
            },
            stroke: {
                width: 0
            },
            plotOptions: {
                heatmap: {
                radius: 10,
                enableShades: false,
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 0,
                        color: '#7986CB'
                    },
                    {
                        from: 1,
                        to: 5,
                        color: '#5C6BC0'
                    },
                    {
                        from: 6,
                        to: 10,
                        color: '#3949AB'
                    },
                    {
                        from: 11,
                        to: 30,
                        color: '#283593'
                    },
                    {
                        from: 31,
                        to: 100,
                        color: '#1A237E'
                    },
                    ],
                },           
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                colors: ['#fff']
                }
            },
            xaxis: {
                type: 'category',
                categories: []
            },
            title: {
                text: ''
            }
        },
        xlabels: []
      }
    },
    mounted() {
    },
    methods: {
        getXMax() {
            for (var data of this.mouseData.data) {
                if (data.x_coord > this.xMax) {
                    this.xMax = data.x_coord
                }
            }
        },
        getYMax() {
            for (var data of this.mouseData.data) {
                if (data.y_coord > this.yMax) {
                    this.yMax = data.y_coord
                }
            }
        },
        roundToNearestBase(num, base) {
            return Math.round(parseInt(num)/base)*base
        },
        populateMappedMouseData(base) {    
            this.heatmapData = []        
            let numberOfXSegments = Math.ceil(this.xMax/base)+1
            let numberOfYSegments = Math.ceil(this.yMax/base)
            for (let seg = 0; seg <= numberOfYSegments; seg++) {
                this.heatmapData.push({'name': seg*base.toString(), 'data':new Array(numberOfXSegments).fill(0)})
            }
            this.$refs.heatmap.updateSeries(this.heatmapData)
            for (var coords of this.mouseData.data.slice(0,parseInt(this.getNumberOfVisualDataPoints))) {
                for (var serie of this.heatmapData) {
                    if (this.roundToNearestBase(coords.y_coord,base).toString() == serie.name) {
                        serie.data[Math.round(parseInt(coords.x_coord)/base)] += 1
                    }
                }
            }

            for (let seg = 0; seg <= numberOfXSegments; seg++) {
                this.xlabels.push(seg*base)
            }

            this.$refs.heatmap.updateSeries(this.heatmapData)

            this.$refs.heatmap.updateOptions({
                xaxis: {
                    categories: this.xlabels
                }
            })

            // this.getBenfordDistribution()
        },
        getNumberOfDataPoints() {
            if (this.mouseData != undefined) {
                console.log(this.mouseData)
                return this.mouseData.data.length
            }
            return 0    
        },
        getBenfordDistribution() {
            // if (this.heatmapData) {
                console.table(this.heatmapData[0])
                for (let data of this.heatmapData.data) {
                    console.log("ABC")
                    for (let dataPoint of data) {
                        this.bendfordsDistribution[parseInt(dataPoint.toString()[0])] += 1
                    }
                }
            // }
            
        }
    },
    computed: {
        ...mapGetters(['getNumberOfVisualDataPoints'])
    },
    watch: {
        mouseData: function() { // watch it
          if (this.mouseData) {
            this.getXMax()
            this.getYMax()
            this.populateMappedMouseData(40)
            // console.log(this.mouseData.data.length)
          }
        
        },
        heatmapData: function() {
            if (this.heatmapData) {
                this.bendfordsDistribution = new Array(10).fill(0)
                console.log(this.heatmapData)
                for (let data of this.heatmapData) {
                    for (let dataPoint of data.data) {
                        this.bendfordsDistribution[parseInt(dataPoint.toString()[0])] += 1
                    }
                }
            }
            var sumBenford = this.bendfordsDistribution.slice(1,this.bendfordsDistribution.length).reduce((num1, num2) => num1 + num2, 0)
            // var maxBendord = Math.max(...this.bendfordsDistribution.slice(1,this.bendfordsDistribution.length-1))
            for (var i = 1; i < this.bendfordsDistribution.length; i++) {
                this.bendfordsDistribution[i] = (this.bendfordsDistribution[i]/sumBenford *100).toFixed(1)
            }
        },
        getNumberOfVisualDataPoints: function() {
            this.getXMax()
            this.getYMax()
            this.populateMappedMouseData(40)
        }
    }
};
</script>
