import { mixins, Bar } from 'vue-chartjs';

export default {
  name: 'barChart',
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: null,
    }, 
    position: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      options: {
        //Chart.js options
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          align: 'start',
          labels: {
            fontSize: 12,
            padding: 20,
            usePointStyle: true,
            boxWidth: 7,
          },
        },
        title: {
          display: this.title !== null ? true : false,
          text: this.title,
          position: this.position,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};

// Example

// Props: title -> Titulo de la grafica
//        position -> Posicion del titulo (default: 'bottom')

// <bar-chart title="Alertas en red"  :chartData="datacollectionBar"></bar-chart>

// datacollectionBar: {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   datasets: [
//     {
//       backgroundColor: 'orange', //Color de las barras
//       maxBarThickness: 10,       //Ancho de las barras
//       data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
//     }
//   ]
// },
