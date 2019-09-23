export const getCount = (num) => {
  let count = '';
  if (num < 0) {
    return '';
  }
  if (num < 10000) {
    count = num;
  } else if (Math.floor(num / 10000) < 10000) {
    count = `${Math.floor(num / 1000) / 10}万`;
  } else {
    count = `${Math.floor(num / 10000000) / 10}亿`;
  }
  return count;
};
