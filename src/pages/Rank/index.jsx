import React, {
  memo,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
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
              <li key={`${item.first} - ${item.second}`}>
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

const renderRankList = (list, global) => {
  console.log(list);
  return (
    <StyledRankList globalRank={global}>
      {
        list.map((item) => {
          return (
            <StyledRankListItem key={item.coverImgId} tracks={item.tracks}>
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
  rankList,
  getDataLoading,
  getRankListDispatch,
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
    <StyledRankContainer>
      <Scroll ref={rankScroll}>
        <div>
          {
            getDataLoading ? <Loading /> : (
              <>
                <h1 className="official">官方榜</h1>
                { renderRankList(officialList) }
                <h1 className="global">全球榜</h1>
                { renderRankList(globalList, true) }
              </>
            )
          }
        </div>
      </Scroll>
    </StyledRankContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    rankList: state.getIn(['rank', 'rankList']),
    getDataLoading: state.getIn(['rank', 'getDataLoading']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch: () => {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank));
