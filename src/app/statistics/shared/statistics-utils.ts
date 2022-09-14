import { getRandomColors } from '../../commons/utils';
import {ChartConfiguration} from 'chart.js';
import {TranslateService} from "@ngx-translate/core";

/**
 * Create chart-js information for a line chart
 *
 * @param labels labels for the horizontal axes
 * @param linesData  array of object (one for each line we want display) with following information:
 * color of line, data array of line, name of line to display in legend
 * @returns data and options for chart components
 * @example
 * Usage example:
 *     getLineChart(["Jan", "Feb", ...], [{color: "#6bd098", values: [338, 354, ...], label: "Numbers"},])
 */
export function getLineChart(
  labels: string[],
  linesData: { color?: string; values: number[]; label?: string }[]
): {data: ChartConfiguration['data']; options: ChartConfiguration['options']} {
  let legend = false;
  const datasets = linesData.map((dataset) => {
    legend = dataset.hasOwnProperty('label');

    if (!dataset.hasOwnProperty('color')) {
      dataset.color = getRandomColors(1);
    }

    return {
      label: dataset.label,
      data: dataset.values,
      fill: false,
      borderColor: dataset.color,
      backgroundColor: 'transparent',
      pointBorderColor: dataset.color,
      pointRadius: 3,
      pointHoverRadius: 8,
      pointBorderWidth: 8,
    };
  });

  const data: ChartConfiguration['data'] = {
    labels,
    datasets
  };

  const options: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legend,
        position: 'bottom'
      },
      tooltip: {
        bodySpacing: 4,
        mode:'nearest',
        intersect: true,
        position:'nearest',
        padding: 10,
        caretPadding:10
      },
    },
    responsive: true,
    layout: {
      padding: {left:0, right:0, top:15, bottom:15}
    }
  };

  return {
    data,
    options
  };
}


/**
 * Create chart-js information for a line chart
 *
 * @param labels labels for the horizontal axes
 * @param dataObjects  array of object (one for each line we want display) with following information:
 * colors of values (one colors for each value), values array of line
 * @param customOptions custom chart.js options for chart drawing (will overwrite default options)

 * @returns data and options for chart components
 * @example
 *  * Usage example:
 *     getPieChart(["Opened", "Read", 3, 4], [ {colors: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"], values: [342, 480, 530, 120]}));
 */
export function getPieChart(
  labels: string[],
  dataObjects: {colors?: string[]; values: number[]}[],
  customOptions: ChartConfiguration['options'] = undefined): {data: ChartConfiguration['data']; options: ChartConfiguration['options']} {
  const datasets = dataObjects.map((dataset) => {
    if (!dataset.hasOwnProperty('colors')) {
      dataset.colors = getRandomColors(dataset.values.length);
    }

    return {
      data: dataset.values,
      backgroundColor: dataset.colors,
      hoverBorderColor: dataset.colors,
      borderWidth: 0,
      hoverBorderWidth: 2
    };
  });

  const data: ChartConfiguration['data'] = {
    labels,
    datasets,
  };

  const defaultOptions: ChartConfiguration['options'] = {
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: true,
        position: 'nearest',
        padding: 10,
        caretPadding: 5
      },
    },
    responsive: true,
  };

  const options = (customOptions !== undefined) ?
    {...defaultOptions, ...customOptions}  // merge two objects
    : defaultOptions;

  return {
    data,
    options
  };
}

/**
 * Create chart-js information for a bar chart
 *
 * @param labels labels for the horizontal axes
 * @param dataObjects  array of object (one for each dataset we want display) with following information:
 * color (one or list) of bars (if set to 'multi' or not set at all, automatically will be create a random multicolor chart),
 * data array of line, name of line to display in legend
 * @param customOptions custom chart.js options for chart drawing (will overwrite default options)
 * @returns data and options for chart components
 * @example
 * Usage example:
 *     getBarChart(["Jan", "Feb", ...], [{color: "#6bd098", values: [338, 354, ...], label: "Numbers"},])
 */
// export const  = function(labels, dataObjects, customOptions = undefined) {
export function getBarChart(
  labels: string[],
  dataObjects: {color?: string; values: number[]; label?: string}[],
  customOptions: ChartConfiguration['options'] = undefined): {data: ChartConfiguration['data']; options: ChartConfiguration['options']} {
  let legend = false;
  const datasets = dataObjects.map((dataset) => {
    if (dataset.color === 'multi' || !dataset.hasOwnProperty('color')) {
      dataset.color = getRandomColors(dataset.values.length);
    }
    legend = dataset.hasOwnProperty('label') ;

    return {
      label: dataset.label,
      data: dataset.values,
      borderColor: dataset.color,
      backgroundColor: dataset.color,
      // borderWidth: 2,
      hoverBackgroundColor: dataset.color,
      hoverBorderWidth: 2,
    };
  });

  const data: ChartConfiguration['data'] = {
    labels,
    datasets,
  };

  const defaultOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legend,
        position: 'bottom'
      },
      tooltip: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        padding: 10,
        caretPadding: 10
      }
    },
    responsive: true,
  };

  const options = (customOptions !== undefined) ?
    {...defaultOptions, ...customOptions}  // merge two objects
    : defaultOptions;

  return {
    data,
    options
  };
}
