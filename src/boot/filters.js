import Vue from 'vue';

Vue.filter('dummy', function(value) {
  if (!value) return '--';
  return value;
});
Vue.filter('formatHourComplete', function(value) {
  if (!value) return '--:--:--';
  //return value;
  let dates = null;
  let hour = null;
  if (value.includes('T')) {
    dates = value.split('T');
  } else {
    dates = value.split(' ');
  }
  dates[1] = dates[1] ? dates[1].substring(0, 8) : '';
  if (dates[1].includes(':')) {
    hour = dates[1].split(':');
  }
  hour[0] = hour[0] ? hour[0].substring(0, 2) : '';
  hour[1] = hour[1] ? hour[1].substring(0, 5) : '';
  hour[2] = hour[2] ? hour[2].substring(0, 8) : '';
  return `${hour[0]}:${hour[1]}:${hour[2]}`;
});
Vue.filter('formatHour', function(value) {
  if (!value) return '--:--';
  //return value;
  let dates = null;
  let hour = null;
  if (value.includes('T')) {
    dates = value.split('T');
  } else {
    dates = value.split(' ');
  }
  dates[1] = dates[1] ? dates[1].substring(0, 5) : '';
  if (dates[1].includes(':')) {
    hour = dates[1].split(':');
  }
  hour[0] = hour[0] ? hour[0].substring(0, 2) : '';
  hour[1] = hour[1] ? hour[1].substring(0, 5) : '';
  return `${hour[0]}:${hour[1]}`;
});
Vue.filter('formatDateHour', function(
  value,
  oldFormat = 'y-m-d',
  newFormat = 'm/d/y',
) {
  if (!value || '') return '--/--/----';
  //return value;
  let dates = null;
  if (value.includes('T')) {
    dates = value.split('T');
  } else {
    dates = value.split(' ');
  }
  dates[0] = transformDate(dates[0], oldFormat, newFormat);
  dates[1] = dates[1] ? dates[1].substring(0, 5) : '';
  return `${dates[0]} ${dates[1]}`;
});
Vue.filter('formatDate', function(value, oldFormat = 'y-m-d', newFormat = 'm/d/y') {
  if (!value || '') return '--/--/----';
  //return value;
  let dates = null;
  if (value.includes('T')) {
    dates = value.split('T');
  } else {
    dates = value.split(' ');
  }
  dates[0] = transformDate(dates[0], oldFormat, newFormat);
  return `${dates[0]}`;
});

function transformDate(value, oldFormat = 'y-m-d', newFormat = 'm/d/y') {
  let delimiter = value.replace(/[0-9]/g, '@');
  delimiter = delimiter.split('@');
  delimiter = delimiter.find(val => !!val);

  let formatAux = oldFormat.split(delimiter);
  let dateAux = value.split(delimiter);

  let objectOrder = {};

  formatAux.map((info, index) => {
    objectOrder[info] = dateAux[index];
  });

  formatAux.map(info => {
    newFormat = newFormat.replace(info, objectOrder[info]);
  });

  return newFormat;
}
