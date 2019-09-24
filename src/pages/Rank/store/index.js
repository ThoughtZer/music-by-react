import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';

export const CHANGE_RANK_LIST = 'rank/CHANGE_RANK_LIST';
export const CHANGE_GETDATA_LOADING = 'rank/CHANGE_GETDATA_LOADING';

const updateGetDataLoading = (data) => ({
  type: CHANGE_GETDATA_LOADING,
  data,
});

const updateRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data),
});

export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then((data) => {
      const list = data && data.list;
      dispatch(updateRankList(list));
      dispatch(updateGetDataLoading(false));
    });
  };
};

const initialState = fromJS({
  getDataLoading: true,
  rankList: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_RANK_LIST:
    return state.set('rankList', action.data);
  case CHANGE_GETDATA_LOADING:
    return state.set('getDataLoading', action.data);
  default:
    return state;
  }
};

export { reducer };
