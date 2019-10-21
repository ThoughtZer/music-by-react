import React, {
  memo,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { getRankList } from './store';
import Loading from '../../base/Loading';
import Scroll from '../../base/Scroll';
import {
  StyledRankContainer,
  StyledRankList,
  StyledRankListItem,
  StyledRankSongList,
} from './styled';
import { filterRankList } from '../../common/js/utils';

const renderSongList = (list) => {
  return (
    list.length ? (
      <StyledRankSongList>
        {
          list.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${item.first} - ${item.second} - ${index}`}>
                {index + 1}
                  .
                {item.first}
                  -
                {item.second}
              </li>
            );
          })
        }
      </StyledRankSongList>
    ) : ''
  );
};

const renderRankList = (history, list, global) => {
  const handleClickToDetail = (id) => {
    history.push(`/rank/${id}`);
  };
  return (
    <StyledRankList globalRank={global}>
      {
        list.map((item, index) => {
          return (
            <StyledRankListItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${item.coverImgId} + ${index}`}
              tracks={item.tracks}
              onClick={() => handleClickToDetail(item.id)}
            >
              <div className="img-wrapper">
                <img src={item.coverImgUrl} alt="排行榜图片" />
                <div className="decorate" />
                <span className="update-frequency">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks) }
            </StyledRankListItem>
          );
        })
      }
    </StyledRankList>
  );
};

const Rank = ({
  songsCount,
  rankList,
  getDataLoading,
  getRankListDispatch,
  history,
  route,
}) => {
  const rankScroll = useRef(null);
  useEffect(() => {
    if (rankList.size) {
      return;
    }
    getRankListDispatch();
  }, [getRankListDispatch, rankList.size]);

  const rankListJs = rankList.toJS();

  const { globalList, officialList } = filterRankList(rankListJs);

  return (
    <StyledRankContainer songsCount={songsCount}>
      <Scroll ref={rankScroll}>
        <div>
          {
            getDataLoading ? <Loading /> : (
              <>
                <h1 className="official">官方榜</h1>
                { renderRankList(history, officialList) }
                <h1 className="global">全球榜</h1>
                { renderRankList(history, globalList, true) }
              </>
            )
          }
        </div>
      </Scroll>
      { renderRoutes(route.children) }
    </StyledRankContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    rankList: state.getIn(['rank', 'rankList']),
    getDataLoading: state.getIn(['rank', 'getDataLoading']),
    songsCount: state.getIn(['player', 'playList']).size,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch: () => {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(withRouter(Rank)));
