import { mixins, Doughnut } from 'vue-chartjs';
import pluginChartText from './plugin-chart-text';
import { colors } from 'quasar';
const defaultOptions = {
  fontStyle: 'Arial',
  elements: {
    center: {
      title: null,
      /*   description: null,
      color: colors.getPaletteColor('grey-8'),
      lineColor: colors.getBrand('primary'), */
    },
    circleCenter: {
      bgColor: colors.getPaletteColor('white'),
      shadowColor: colors.getPaletteColor('grey-10'),
    },
    // circData: {
    //   text: null,
    //   color: colors.getBrand('primary'),
    // },
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'top',
    align: 'start',
    labels: {
      boxWidth: 8,
      fontSize: 12,
      padding: 20,
      usePointStyle: true,
    },
  },
  cutoutPercentage: 90,
  circumference: 2 * Math.PI,
};
export default {
  name: 'doughnut',
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          datasets: [
            {
              data: [0, 0],
            },
          ],
        };
      },
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    // labelCircum: {
    //   type: String,
    //   default: '',
    // },
    showCircleCenter: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.addPlugin(pluginChartText);
    defaultOptions.elements.center.title = this.chartData.datasets[0].label;
    /*     defaultOptions.elements.center.description = this.subtitle; */
    // defaultOptions.elements.circData.text = this.labelCircum;
    let fullOptions = Object.assign(defaultOptions, this.options);
    if (!this.showCircleCenter) {
      delete fullOptions.elements.circleCenter;
    }
    if (this.chartData.datasets[0].data.length === 1) {
      this.chartData.datasets[0].data.push(100 - this.chartData.datasets[0].data[0]);
      this.chartData.datasets[0].backgroundColor.push(
        colors.getPaletteColor('white'),
      );
    }
    this.renderChart(this.chartData, fullOptions);
  },
  methods: {},
};

// Example

// <doughnut
//    class="doughnut-chart"
//    title="12,148"
//    subtitle="Monto semanal de contracargos"
//    labelCircum="1.9% INDICE DE CONTRACARGO"
//    :showCircleCenter="true"
//    :chartData="dataTransaction"
// ></doughnut>

// datacollection = {
//   labels: ['Transacciones Totales', 'Transacciones con alertas'],
//   datasets: [
//     {
//       backgroundColor: [
//         'red',
//       ],
//       data: [19],
//     },
//   ],
// };
