import React, {
  memo,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { StyledAlbumSongItem, StyledAlbumSongList } from './styled';
import { getCount, getName } from '../../common/js/utils';

const SongList = forwardRef(({
  collectCount,
  showCollect,
  songs,
}, refs) => {
  return (
    <StyledAlbumSongList ref={refs} showBackground>
      <div className="first-line">
        <div className="play-all">
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
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={item.name + item.al.name + getName(item.ar) + index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    { getName(item.ar) }
                      -
                    { item.al.name }
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

export default memo(SongList);
