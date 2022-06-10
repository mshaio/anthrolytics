<template>
  <div id="chart">
    <apex-chart type="line" height="350" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script>

export default {
  data() {    
    return {
      series: [
        {
          name: "Benford's Distribution (reference)",
          data: [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]
        },
        {
          name: "Data Distribution",
          data: ['36.8', '17.1', '13.7', '9.4', '6.4', '4.0', '4.0', '4.7', '4.0']
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Benford Distribution',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: [1,2,3,4,5,6,7,8,9],
          title: {
            text: 'Most Significant Digit'
          }
        },
        yaxis: {
          title: {
            text: 'Occurance'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
    }
  },
}

</script>
