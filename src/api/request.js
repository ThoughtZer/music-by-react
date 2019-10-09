import request from './config';

// 请求首页banner列表
export const getBannerRequest = () => {
  return request.get('/banner');
};

// 请求首页推荐列表
export const getRecommendListRequest = () => {
  return request.get('/personalized');
};

// 请求歌手列表
export const getHotSingerListRequest = (offset) => {
  return request.get(`/top/artists?offset=${offset}`);
};

// 请求条件歌手列表
export const getSingerListRequest = (category, alpha, offset) => {
  return request.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${offset}`);
};

// 获取排行榜
export const getRankListRequest = () => {
  return request.get('/toplist/detail');
};

// 获取推荐歌单详情
export const getAlbumDetailRequest = (id) => {
  return request.get(`/playlist/detail?id=${id}`);
};

// 获取歌手详情
export const getSingerInfoRequest = (id) => {
  return request.get(`/artists?id=${id}`);
};
