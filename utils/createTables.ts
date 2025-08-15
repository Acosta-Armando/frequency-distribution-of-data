import { DirectDataFrequency, GroupedDataFrequency } from '@/interface';
import { roundNumber } from './utils';

// Creates a direct frequency table from a given array of numbers.
export const createDirectTable = (
  roundedNumbersArr: Array<number>,
  setResults: (value: Array<DirectDataFrequency>) => void,
  setPromedio: (value: number) => void
) => {
  // Total number of data points.
  const N = roundedNumbersArr.length;

  // Count the occurrences of each number to determine absolute frequency (f).
  const frequencyMap: { [key: number]: number } = {};
  roundedNumbersArr.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  });

  // Create an array of unique numbers from the data.
  const uniqueNumbers = Object.keys(frequencyMap).map(Number);

  // Initialize the result array with X and f.
  const resultArray: DirectDataFrequency[] = uniqueNumbers.map((num) => ({
    X: num,
    f: frequencyMap[num],
  }));

  // Sort the array by number in ascending order.
  resultArray.sort((a, b) => a.X - b.X);

  // Calculate the cumulative absolute frequency (F).
  let cumulativeF = 0;
  resultArray.forEach((item) => {
    cumulativeF += item.f;
    item.F = cumulativeF;
  });

  // Add any missing numbers within the range with a frequency of 0.
  const minNumber = Math.min(...uniqueNumbers);
  const maxNumber = Math.max(...uniqueNumbers);
  for (let i = minNumber; i <= maxNumber; i++) {
    if (!frequencyMap[i]) {
      // Add the missing number and keep the previous cumulative frequency.
      resultArray.push({ X: i, f: 0, F: cumulativeF });
    }
  }

  // Re-sort the array after adding missing numbers.
  resultArray.sort((a, b) => a.X - b.X);

  // Recalculate F and compute h, p, H, and P for all items.
  cumulativeF = 0;
  resultArray.forEach((item) => {
    cumulativeF += item.f;
    item.F = cumulativeF; // Update F
    item.h = item.f / N; // Relative frequency
    item.p = item.h * 100; // Relative percentage frequency
    item.H = item.F / N; // Cumulative relative frequency
    item.P = (item.H * 100).toFixed(2); // Cumulative relative percentage frequency
    item.fxX = item.f * item.X; // Product of f and X
  });

  // Calculate the average (mean).
  const totalfxX = resultArray.reduce((acc, data) => acc + data.fxX!, 0);
  const promedio = roundNumber(totalfxX / N);
  setPromedio(promedio);

  // Calculate deviation from the mean for variance and standard deviation.
  resultArray.forEach((item) => {
    item.XminProd = item.X - promedio;
    item.XminProd2 = item.XminProd * item.XminProd;
    item.fxminProd2 = item.f * item.XminProd2;
  });

  setResults(resultArray);
};

// Creates a grouped frequency table from a given array of numbers and intervals.
export const createGroupedTable = (
  roundedNumbersArr: Array<number>,
  groupedArray: Array<number[]>,
  setResults: (value: Array<GroupedDataFrequency>) => void,
  setPromedio: (value: number) => void
) => {
  const results: GroupedDataFrequency[] = [];
  // Total number of data points.
  const N = roundedNumbersArr.length;
  let cumulativeF = 0;

  groupedArray.forEach((interval) => {
    const [lowerBound, upperBound] = interval;

    // Class interval boundaries (XiXs)
    const XiXs = interval;
    // Real class limits (LiLs)
    const LiLs = [lowerBound - 0.5, upperBound + 0.5];

    // Calculate absolute frequency (f) for the interval.
    const f = roundedNumbersArr.filter(
      (num) => num >= lowerBound && num <= upperBound
    ).length;

    // Calculate cumulative absolute frequency (F).
    cumulativeF += f;
    const F = cumulativeF;

    // Calculate relative frequencies and percentages.
    const h = N > 0 ? f / N : 0;
    const p = h * 100;
    const H = N > 0 ? F / N : 0;
    const P = H * 100;

    // Calculate the class midpoint (Xm).
    const Xm = (XiXs[0] + XiXs[1]) / 2;

    // Calculate the product of f and Xm.
    const fxXm = f * Xm;

    // Add the computed object to the results array.
    results.push({
      XiXs,
      LiLs,
      f,
      F,
      h,
      p,
      H,
      P,
      Xm,
      fxXm,
    });
  });

  // Calculate the average (mean) for grouped data.
  const totalfxXm = results.reduce((acc, data) => acc + data.fxXm!, 0);
  const promedio = roundNumber(totalfxXm / N);
  setPromedio(promedio);

  // Calculate deviation from the mean for variance and standard deviation.
  results.forEach((result, index) => {
    const XmminProd = result.Xm - promedio;
    const XmminProd2 = XmminProd * XmminProd;
    const fXmminProd2 = result.f * XmminProd2;

    // Update the object with the new properties.
    results[index] = {
      ...result,
      XmminProd,
      XmminProd2,
      fXmminProd2,
    };
  });

  setResults(results);
};