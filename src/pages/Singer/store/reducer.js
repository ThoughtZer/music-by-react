import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const initialState = fromJS({
  artist: {},
  songsOfArtist: [],
  getDataLoading: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_ARTIST:
    return state.set('artist', action.data);
  case actionTypes.CHANGE_SONGS_OF_ARTIST:
    return state.set('songsOfArtist', action.data);
  case actionTypes.CHANGE_GETDATA_LOADING:
    return state.set('getDataLoading', action.data);
  default:
    return state;
  }
};
