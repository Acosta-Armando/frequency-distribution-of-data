import { GroupedDataFrequency } from "@/interface";

/**
 * Handles the 'Enter' key press event.
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
 * @param {() => void} func - The function to execute on 'Enter' key press.
 */
export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  func: () => void
) => {
  if (e.key === 'Enter') {
    func();
  }
};

/**
 * Rounds a number using a specific rounding rule (round half to even).
 * Numbers ending in .5 are rounded to the nearest even integer.
 *
 * @param {number} num - The number to round.
 * @returns {number} The rounded number.
 */
export const roundNumber = (num: number) => {
  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;

  if (decimalPart > 0.59) {
    return integerPart + 1;
  } else if (decimalPart < 0.5) {
    return integerPart;
  } else {
    // Round to the nearest even integer for .5 cases.
    if (integerPart % 2 === 0) {
      return integerPart;
    } else {
      return integerPart + 1;
    }
  }
};

/**
 * Calculates the median of an array of numbers.
 * The median is the middle value of a sorted dataset.
 *
 * @param {Array<number>} arr - The array of numbers.
 * @returns {number} The median value.
 */
export const calculateMedian = (arr: Array<number>): number => {
  // Sort the array in ascending order.
  const sortedArr = [...arr].sort((a, b) => a - b);
  const length = sortedArr.length;

  if (length === 0) return 0;

  // For an odd number of elements, return the middle element.
  if (length % 2 === 1) {
    return sortedArr[Math.floor(length / 2)];
  } else {
    // For an even number of elements, return the average of the two middle elements.
    const mid1 = sortedArr[length / 2 - 1];
    const mid2 = sortedArr[length / 2];
    return (mid1 + mid2) / 2;
  }
};

/**
 * Calculates the mode(s) of an array of numbers.
 * The mode is the number(s) that appear most frequently.
 *
 * @param {Array<number>} arr - The array of numbers.
 * @returns {Array<number>} An array containing the mode(s).
 */
export const calculateModa = (arr: Array<number>) => {
  const frequencyMap = new Map();

  // Count the frequency of each number.
  arr.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  // Find the maximum frequency.
  let maxFrequency = 0;
  frequencyMap.forEach((freq) => {
    if (freq > maxFrequency) {
      maxFrequency = freq;
    }
  });

  // Collect all numbers that have the maximum frequency.
  const mostFrequentNumbers: Array<number> = [];
  frequencyMap.forEach((freq, num) => {
    if (freq === maxFrequency) {
      mostFrequentNumbers.push(num);
    }
  });

  return mostFrequentNumbers;
};

/**
 * Creates grouped intervals for a frequency distribution table.
 *
 * @param {number} minNumber - The minimum value in the dataset.
 * @param {number} maxNumber - The maximum value in the dataset.
 * @param {number} newI - The class width (interval size).
 * @returns {Array<number[]>} An array of intervals.
 */
export const createGroupedArrays = (
  minNumber: number,
  maxNumber: number,
  newI: number,
) => {
  const intervals = [];
  let start = minNumber;

  while (start <= maxNumber) {
    // Calculate the end of the current interval.
    const end = start + newI - 1;
    intervals.push([start, end]);
    // Set the start of the next interval.
    start = end + 1;
  }

  // Ensure the last interval includes the maximum number if needed.
  if (intervals.length > 0 && intervals[intervals.length - 1][1] < maxNumber) {
    intervals[intervals.length - 1][1] = maxNumber;
  }
  return intervals;
};

/**
 * Finds the specific class interval needed to calculate the median for grouped data.
 *
 * @param {Array<GroupedDataFrequency>} groupedDataResults - The grouped frequency table.
 * @param {number} N2 - Half of the total number of data points (N/2).
 * @param {(value: number) => void} setLi - Setter for the lower boundary (Li).
 * @param {(value: number | null) => void} setFi - Setter for the frequency of the median class (f).
 * @param {(value: number | null) => void} setF - Setter for the cumulative frequency of the class preceding the median class (F).
 */
export const handleCalculateLiFi = (
  groupedDataResults: Array<GroupedDataFrequency>,
  N2: number,
  setLi: (value: number) => void,
  setFi: (value: number | null) => void,
  setF: (value: number | null) => void
) => {
  if (groupedDataResults.length === 0) return;

  // Find the first interval where the cumulative frequency (F) is greater than N/2.
  let foundIndex = -1;
  for (let i = 0; i < groupedDataResults.length; i++) {
    if (groupedDataResults[i].F > N2) {
      foundIndex = i;
      break;
    }
  }

  // If a valid interval is found, set the necessary values.
  if (foundIndex !== -1) {
    const currentObject = groupedDataResults[foundIndex];
    const previousObject = foundIndex > 0 ? groupedDataResults[foundIndex - 1] : null;

    // Set Li (lower real limit of the median class).
    setLi(currentObject.LiLs[0]);
    // Set fi (frequency of the median class).
    setFi(currentObject.f);
    // Set F (cumulative frequency of the class before the median class).
    setF(previousObject ? previousObject.F : null);
  }
};