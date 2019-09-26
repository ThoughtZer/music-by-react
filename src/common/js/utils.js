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

export const filterRankList = (rankList) => {
  const globalIndex = rankList.findIndex((rank) => {
    return rank.tracks && !rank.tracks.length;
  });

  const officialList = rankList.slice(0, globalIndex);
  const globalList = rankList.slice(globalIndex);

  return {
    officialList,
    globalList,
  };
};

export const getName = (list) => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : `/${item.name}`;
    return item;
  });
  return str;
};

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;
