import React, {
  memo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'react-router-dom';
import {
  StyledListWrapper,
  StyledList,
  StyledListItem,
} from './styled';
import { getCount } from '../../common/js/utils';
import LazyLoadPlaceHolderImage from './music.png';

const RecommendList = ({
  recommendList,
  history,
}) => {
  const handleClickToDetail = useCallback(
    (id) => {
      history.push(`/recommend/${id}`);
    },
    [history],
  );

  return (
    <StyledListWrapper>
      <h1 className="title">推荐的歌单</h1>
      <StyledList>
        {
          recommendList.map((item) => {
            return (
              <StyledListItem
                onClick={() => handleClickToDetail(item.id)}
                key={item.id}
                className="border-bottom"
              >
                <div className="img">
                  <LazyLoad
                    placeholder={
                      <img width="100%" height="100%" src={LazyLoadPlaceHolderImage} alt="占位图" />
                    }
                  >
                    <img src={`${item.picUrl}?param=60y60`} width="100%" height="100%" alt="音乐图片" />
                  </LazyLoad>
                </div>
                <div className="play-count">
                  <div className="desc">{ item.name }</div>
                  <span className="count">
                    <i className="iconfont play">&#xe885;</i>
                    {getCount(item.playCount)}
                  </span>
                </div>
              </StyledListItem>
            );
          })
        }
      </StyledList>
    </StyledListWrapper>
  );
};

RecommendList.propTypes = {
  recommendList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    picUrl: PropTypes.string,
    playCount: PropTypes.number,
    name: PropTypes.string,
  })),
};

export default memo(withRouter(RecommendList));
