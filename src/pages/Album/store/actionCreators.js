import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import { getAlbumDetailRequest } from '../../../api/request';

const updateCurrentAlbum = (data) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
});

export const updateGetDataLoading = (data) => ({
  type: actionTypes.CHANGE_GETDATA_LOADING,
  data,
});

export const getAlbumList = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then((res) => {
      const { playlist: data } = res;
      dispatch(updateCurrentAlbum(data));
      dispatch(updateGetDataLoading(false));
    });
  };
};
