/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 木メメ木+大
 * @Date: 2019-10-23 19:38:40
 * @LastEditors: 木メメ木+大
 * @LastEditTime: 2020-04-24 17:14:52
 */
import axios from 'axios';

export const baseURL = 'http://127.0.0.1:3000';

const server = axios.create({
  baseURL,
  timeout: 10000,
});

server.interceptors.request.use((options) => {
  return options;
});

server.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (/^2\d+/.test(data.code)) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  },
  (error) => {
    const errorStatus = error.request.status;
    let errorMsg = '';
    if (errorStatus || errorStatus === 0) {
      switch (errorStatus) {
      case 403:
      case 404:
        errorMsg = '404 服务器异常，请查看其他页面';
        break;
      case 500:
        errorMsg = '500 服务器异常，请稍后重试';
        break;
      case 502:
        errorMsg = '502 请求失败，请稍后重试';
        break;
      case 0:
        errorMsg = '服务器连接超时，请重新尝试';
        break;
      default:
        errorMsg = '服务器异常，请重新尝试';
      }
    }
    return Promise.reject(new Error(errorMsg));
  },
);

export default server;
