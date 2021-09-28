import { mixins, Line } from 'vue-chartjs';

export default {
  name: 'linechart',
  extends: Line,
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
    labelY: {
      type: String,
      default: null,
    },
    labelX: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      options: {
        //Chart.js options
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: this.labelY !== null ? true : false,
                labelString: this.labelY,
              },
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
              scaleLabel: {
                display: this.labelX !== null ? true : false,
                labelString: this.labelX,
              },
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'day',
                unitStepSize: 2,
                /*  displayFormats: {
                  minute: 'MMM D, hh:mm:ss',
                }, */
              },
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
          display: false,
          align: 'start',
          labels: {
            fontSize: 12,
            boxWidth: 6,
            padding: 20,
            usePointStyle: true,
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

// Props: labelY -> Nombre del eje Y
//        labelX -> Nombre del eje X
//        title -> Titulo de la grafica
//        position -> Posicion del titulo (default: 'bottom')

// <LineChart labelY="Bloqueos" labelX="Tiempo" title="Indice de dispersión o bloqueo  en velocidad" position="top" :chartData="datacollectionLine"></LineChart>

// datacollectionLine: {
//     datasets: [{
//         fill: false,
//         backgroundColor: 'orange',
//         borderColor: 'orange',
//         data: [{x:new Date(2019, 11, 30, 1, 0),y:10}, {x:new Date(2019, 11, 30, 1, 7),y:20}, {x:new Date(2019, 11, 30, 1, 10),y:20}],
//     }]
// }
