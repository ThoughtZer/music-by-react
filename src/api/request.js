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
