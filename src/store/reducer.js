import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/Recommend/store';
import { reducer as singersReducer } from '../pages/Singers/store/index';

// 不用模块的store通过combineReducers合并到一起
export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
});
