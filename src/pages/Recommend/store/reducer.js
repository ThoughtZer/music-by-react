import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const initialState = fromJS({
  bannerList: [],
  recommendList: [],
  getDataLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_BANNER_LIST:
    // 使用 immutable 之后返回的时候不用copy state 但是要更改state的值需要使用set方法,一次修改多个值可以用merge方法
    return state.set('bannerList', action.data);
  case actionTypes.CHANGE_RECOMMEND_LIST:
    return state.set('recommendList', action.data);
  case actionTypes.CHANGE_GETDATA_LOADING:
    return state.set('getDataLoading', action.data);
  default:
    return state;
  }
};

export default reducer;
