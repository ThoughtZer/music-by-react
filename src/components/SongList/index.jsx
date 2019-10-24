import React, {
  memo,
  forwardRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledAlbumSongItem, StyledAlbumSongList } from './styled';
import { getCount, getName } from '../../common/js/utils';
import * as actionCreators from '../Player/store/actionCreators';

const SongList = forwardRef(({
  collectCount,
  showCollect,
  songs,
  currentSong: ImmutableCurrentSong,
  updatePlayListDispatch,
  updateCurrentIndexDispatch,
  updateSequecePlayListDispatch,
}, refs) => {
  const handleSelectItem = useCallback((e, index) => {
    updatePlayListDispatch(songs);
    updateSequecePlayListDispatch(songs);
    updateCurrentIndexDispatch(index);
  }, [
    songs,
    updateCurrentIndexDispatch,
    updatePlayListDispatch,
    updateSequecePlayListDispatch,
  ]);

  const currentSong = ImmutableCurrentSong.toJS();

  return (
    <StyledAlbumSongList ref={refs} showBackground>
      <div className="first-line">
        <div className="play-all" onClick={(e) => handleSelectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部
            <span className="sum">
              (共
              {songs.length}
              首)
            </span>
          </span>
        </div>
        {
          showCollect ? (
            <div className="add-list">
              <i className="iconfont">&#xe62d;</i>
              <span>
            收藏(
                {getCount(collectCount)}
              )
              </span>
            </div>
          ) : null
        }
      </div>
      <StyledAlbumSongItem>
        {
          songs.map((item, index) => {
            // 暂时现根据id判断当前播放歌曲，查看网易云应该是和歌单列表也绑定的~
            const isCurrnet = currentSong.id === item.id;
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={item.name + item.al.name + getName(item.ar) + item.id}
                onClick={(e) => handleSelectItem(e, index)}
              >
                {
                  isCurrnet ? (
                    <i className="iconfont index playing">&#xe61d;</i>
                  ) : (
                    <span className="index">{index + 1}</span>
                  )
                }
                <div className="info">
                  <span className={isCurrnet ? 'playing' : ''}>{item.name}</span>
                  <span>
                    { item.ar ? getName(item.ar) : getName(item.artists) }
                      -
                    { item.al ? item.al.name : item.album.name}
                  </span>
                </div>
              </li>
            );
          })
        }
      </StyledAlbumSongItem>
    </StyledAlbumSongList>
  );
});

SongList.propTypes = {
  // songs: PropTypes.arrayOf(PropTypes.shape({
  //  不好定义暂且不定义
  // })),
  collectCount: PropTypes.number,
  showCollect: PropTypes.bool,
};

SongList.defaultProps = {
  collectCount: 0,
  showCollect: false,
};

const mapStateToProps = (state) => {
  return {
    fullScreen: state.getIn(['player', 'fullScreen']),
    playing: state.getIn(['player', 'playing']),
    currentSong: state.getIn(['player', 'currentSong']),
    scrollY: state.getIn(['album', 'scrollY']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayListDispatch(data) {
      dispatch(actionCreators.updatePlayList(data));
    },
    updateCurrentIndexDispatch(data) {
      dispatch(actionCreators.updateCurrentIndex(data));
    },
    updateSequecePlayListDispatch(data) {
      dispatch(actionCreators.updateSequencePlayList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SongList));
