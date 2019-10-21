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

const elementStyle = document.createElement('div').style;

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  // eslint-disable-next-line no-restricted-syntax,no-unused-vars
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = (interval) => {
  // eslint-disable-next-line no-bitwise
  interval |= 0;// |0表示向下取整
  // eslint-disable-next-line no-bitwise
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机算法
export function shuffle(arr) {
  const newArr = [];
  arr.forEach((item) => {
    newArr.push(item);
  });
  for (let i = 0; i < newArr.length; i++) {
    const j = getRandomInt(0, i);
    const t = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = t;
  }
  return newArr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};
