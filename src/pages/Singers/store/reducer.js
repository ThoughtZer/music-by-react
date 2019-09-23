import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const initialState = fromJS({
  singerList: [], // 歌手列表
  getDataLoading: true, // 获取数据Loading
  pullUpLoading: false, // 控制上拉加载动画
  pullDownLoading: false, // 控制下拉加载动画
  listOffset: 0, // 当前请求数据列表的偏移 与 当前的应该请求到的数据list的之前长度一致
  more: true, // 是否还有更多，false 没有更多 true 还有更多
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_SINGER_LIST:
    return state.set('singerList', action.data);
  case actionTypes.CHANGE_LIST_OFFSET:
    return state.set('listOffset', action.data);
  case actionTypes.CHANGE_GETDATA_LOADING:
    return state.set('getDataLoading', action.data);
  case actionTypes.CHANGE_PULLUP_LOADING:
    return state.set('pullUpLoading', action.data);
  case actionTypes.CHANGE_PULLDOWN_LOADING:
    return state.set('pullDownLoading', action.data);
  case actionTypes.CHANGE_NO_MORE:
    return state.set('more', action.data);
  default:
    return state;
  }
};

export default reducer;
