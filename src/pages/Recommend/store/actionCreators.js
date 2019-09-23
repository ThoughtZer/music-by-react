import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

const updateLoading = (loading) => {
  return {
    type: actionTypes.CHANGE_GETDATA_LOADING,
    data: fromJS(loading),
  };
};

const updateBannerList = (list) => {
  return {
    type: actionTypes.CHANGE_BANNER_LIST,
    data: fromJS(list),
  };
};

const updateRecommendList = (list) => {
  return {
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(list),
  };
};

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then((result) => {
      dispatch(updateBannerList(result.banners));
    });
  };
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then((result) => {
      dispatch(updateRecommendList(result.result));
      dispatch(updateLoading(false));
    });
  };
};
