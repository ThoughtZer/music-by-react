import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';

const updateLoading = (loading) => {
  return {
    type: actionTypes.CHANGE_GETDATA_LOADING,
    data: fromJS(loading),
  };
};

export const updateSingerList = (list) => {
  return {
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(list),
  };
};

export const updateListOffset = (offset) => {
  return {
    type: actionTypes.CHANGE_LIST_OFFSET,
    data: fromJS(offset),
  };
};

// 上拉加载
export const updatePullUpLoading = (loading) => {
  return {
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data: fromJS(loading),
  };
};

// 下拉刷新
export const updatePullDownLoading = (loading) => {
  return {
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data: fromJS(loading),
  };
};

// 进入页面加载的歌手列表
export const getHotSingerList = () => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    getHotSingerListRequest(offset).then((result) => {
      const { artists: data } = result;
      dispatch(updateSingerList(data));
      const timer = setTimeout(() => {
        dispatch(updateListOffset(data.length));
        dispatch(updatePullDownLoading(false));
        dispatch(updateLoading(false));
        // 接口再快，也希望用户能看到一个loading，而不是很快的闪过loading
        clearTimeout(timer);
      }, 700);
    });
  };
};

// 进入页面加载的歌手列表之后上拉
export const getMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(offset).then((result) => {
      const { artists: data } = result;
      const list = [...singerList, ...data];
      dispatch(updateSingerList(list));
      const timer = setTimeout(() => {
        dispatch(updateListOffset(list.length));
        dispatch(updatePullUpLoading(false));
        // 接口再快，也希望用户能看到一个loading，而不是很快的闪过loading
        clearTimeout(timer);
      }, 700);
    });
  };
};

// 根据筛选key筛选歌手列表
export const getFilterSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    getSingerListRequest(category, alpha, offset).then((result) => {
      const { artists: data } = result;
      dispatch(updateSingerList(data));
      const timer = setTimeout(() => {
        dispatch(updatePullDownLoading(false));
        dispatch(updateLoading(false));
        dispatch(updateListOffset(data.length));
        // 接口再快，也希望用户能看到一个loading，而不是很快的闪过loading
        clearTimeout(timer);
      }, 700);
    });
  };
};

// 根据筛选key筛选歌手列表上拉记载更多
export const getMoreFilterSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, offset).then((result) => {
      const { artists: data } = result;
      const list = [...singerList, ...data];
      dispatch(updateSingerList(list));

      const timer = setTimeout(() => {
        dispatch(updateListOffset(list.length));
        dispatch(updatePullUpLoading(false));
        dispatch(updatePullDownLoading(false));
        // 接口再快，也希望用户能看到一个loading，而不是很快的闪过loading
        clearTimeout(timer);
      }, 700);
    });
  };
};
