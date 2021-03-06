const setRocCurveData = (results, classNames) => {
  let rocCurveData = [];
  if (results.rocAUC.length) {
  // Changes the fpr and tpr arrays into (rounded) coordinate arrays for the ROC curve chart...
    for (let [fprArr, tprArr] of _.zip(results.fpr, results.tpr)) {
      const coordArr = [];
      for (let [x, y] of _.zip(fprArr, tprArr)) {
        coordArr.push([
          (Math.round(x * 1e3) / 1e3),
          (Math.round(y * 1e3) / 1e3)
        ]);
      }
      rocCurveData.push({ data: coordArr });
    }
    for (let [i, category] of rocCurveData.entries()) {
      rocCurveData[i].name = classNames[i];
    }
    // ...then adds class name to the chart data
  } else {
    rocCurveData.push({
      data: _.zip(results.fpr, results.tpr), // eslint-disable-line no-undef
      name: [classNames[1]]
    });
  }
  return rocCurveData;
};

const setRocCurveConfig = (results, classNames) => {
  const rocCurveData = setRocCurveData(results, classNames);

  /* eslint-disable comma-dangle */
  const rocCurveConfig = {
    title: {
      text: 'ROC Curve',
      x: -20, // center
    },

    subtitle: {
      text: 'Click on a class in the legend to show or hide it',
      x: -20,
    },

    xAxis: {
      title: {
        text: 'False Positive Rate',
      },
      ceiling: 1,
    },

    yAxis: {
      title: {
        text: 'True Positive Rate',
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080',
      }],
      ceiling: 1,
      gridLineWidth: 0,
    },

    credits: false,

    legend: {
      title: {
        text: 'Classes',
      },
      layout: 'vertical',
      // navigation: false,
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
    },

    tooltip: {
      formatter() {
        return 'FPR: <strong>' + this.point.x + '</strong><br>' +
        'TPR: <strong>' + this.point.y + '</strong>';
      },
    },

    series: rocCurveData,
  };
  /* eslint-enable comma-dangle */
  return rocCurveConfig;
};

export default setRocCurveConfig;
