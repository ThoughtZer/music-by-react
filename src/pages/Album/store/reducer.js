import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const initialState = fromJS({
  currentAlbum: {},
  getDataLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_CURRENT_ALBUM:
    return state.set('currentAlbum', action.data);
  case actionTypes.CHANGE_GETDATA_LOADING:
    return state.set('getDataLoading', action.data);
  default:
    return state;
  }
};

export default reducer;
