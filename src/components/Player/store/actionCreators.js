import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

export const updateCurrentSong = (data) => ({
  type: actionTypes.SET_CURRENT_SONG,
  data: fromJS(data),
});

export const updateFullScreen = (data) => ({
  type: actionTypes.SET_FULL_SCREEN,
  data,
});

export const updatePlayingState = (data) => ({
  type: actionTypes.SET_PLAYING_STATE,
  data,
});

export const updateSequencePlayList = (data) => ({
  type: actionTypes.SET_SEQUENCE_PLAYLIST,
  data: fromJS(data),
});

export const updatePlayList = (data) => ({
  type: actionTypes.SET_PLAYLIST,
  data: fromJS(data),
});

export const updatePlayMode = (data) => ({
  type: actionTypes.SET_PLAY_MODE,
  data,
});

export const updateCurrentIndex = (data) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  data,
});

export const updateShowPlayList = (data) => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  data,
});
