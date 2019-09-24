import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import HorizonItem from '../../base/HorizonItem';
import { categoryTypes, alphaTypes } from '../../api/local';
import {
  StyledSingerNavContainer,
  StyledSingerListContainer,
  StyledList,
  StyledListItem,
} from './styled';
import Scroll from '../../base/Scroll';
import Loading from '../../base/Loading';
import NoResult from '../../base/NoResult';
import * as actionCreators from './store/actionCreators';
import LazyLoadPlaceHolderImage from './singer.png';

// 抽离一下 分类以及首字母的筛选Hook
const useFilterKey = (initVal) => {
  const [filterKey, setFilterKey] = useState(initVal);

  const handleChangeFilterKey = useCallback((val) => {
    if (val === filterKey) {
      setFilterKey('');
    } else {
      setFilterKey(val);
    }
  }, [filterKey]);

  return [
    filterKey,
    handleChangeFilterKey,
  ];
};

const renderSingerList = (singerList, pullDownLoading, pullUpLoading, more, getDataLoading) => {
  return (
    <StyledList>
      {
        pullDownLoading ? <Loading text="正在刷新..." /> : ''
      }
      {
        singerList.map((singer) => {
          return (
            <StyledListItem key={`${singer.id}`}>
              <div className="img-wrapper">
                <LazyLoad
                  placeholder={
                    <img width="100%" height="100%" src={LazyLoadPlaceHolderImage} alt="占位图" />
                  }
                >
                  <img src={`${singer.picUrl}?param=50y40`} width="100%" height="100%" alt="歌手图片" />
                </LazyLoad>
              </div>
              <span className="name">{singer.name}</span>
            </StyledListItem>
          );
        })
      }
      {
        (more && pullUpLoading) ? <Loading text="请稍后..." /> : ''
      }
      {
        !getDataLoading ? <NoResult text={!more ? '没有更多内容了~~o(╥﹏╥)o' : '下拉加载更多~'} /> : ''
      }
    </StyledList>
  );
};

const Singers = ({
  singerList,
  getDataLoading,
  getHotSingerListDispatch,
  getFilterSingerListDispatch,
  more,
  pullUpLoading,
  pullDownLoading,
  handlePullDownDispatch,
  handlePullUpDispatch,
}) => {
  const singerListRef = useRef(null);
  const [category, handleChangeCategory] = useFilterKey('');
  const [alpha, handleChangeAlpha] = useFilterKey('');

  useEffect(() => {
    // 通过是否有参数决定请求哪一类数据
    if (category === '' && alpha === '') {
      getHotSingerListDispatch();
    }
    if (category !== '' || alpha !== '') {
      getFilterSingerListDispatch(category, alpha);
    }
    singerListRef.current.refresh();
    // 切换条件的时候强制检测更新下图像
    forceCheck();
  }, [category, alpha, getFilterSingerListDispatch, getHotSingerListDispatch]);

  const handlePullDown = () => {
    handlePullDownDispatch(category, alpha);
  };

  const handlePullUp = () => {
    if (!more) {
      return;
    }
    handlePullUpDispatch(category, alpha, pullUpLoading);
  };

  const singerListJs = singerList.toJS();

  return (
    <>
      <StyledSingerNavContainer>
        <HorizonItem
          list={categoryTypes}
          title="分类(热门):"
          current={category}
          handleClick={handleChangeCategory}
        />
        <HorizonItem
          list={alphaTypes}
          title="首字母:"
          current={alpha}
          handleClick={handleChangeAlpha}
        />
      </StyledSingerNavContainer>
      <StyledSingerListContainer>
        <Scroll
          ref={singerListRef}
          onScroll={forceCheck}
          pullDown={handlePullDown}
          pullUp={handlePullUp}
        >
          { renderSingerList(singerListJs, pullDownLoading, pullUpLoading, more, getDataLoading) }
          { getDataLoading ? <Loading /> : '' }
        </Scroll>
      </StyledSingerListContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    singerList: state.getIn(['singers', 'singerList']),
    getDataLoading: state.getIn(['singers', 'getDataLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    more: state.getIn(['singers', 'more']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerListDispatch: () => {
      dispatch(actionCreators.updateMore(true));
      dispatch(actionCreators.updateListOffset(0));
      dispatch(actionCreators.getHotSingerList());
    },
    getFilterSingerListDispatch: (category, alpha) => {
      dispatch(actionCreators.updateMore(true));
      // 每一次更改筛选条件就重新更新offset为 0
      dispatch(actionCreators.updateListOffset(0));
      dispatch(actionCreators.getFilterSingerList(category, alpha));
    },
    handlePullDownDispatch: (category, alpha) => {
      dispatch(actionCreators.updateMore(true));
      // 每一次刷新当前列表时候就把offset置为 0
      dispatch(actionCreators.updateListOffset(0));
      dispatch(actionCreators.updatePullDownLoading(true));
      if (category === '' && alpha === '') {
        dispatch(actionCreators.getHotSingerList());
      } else {
        dispatch(actionCreators.getFilterSingerList(category, alpha));
      }
    },
    handlePullUpDispatch: (category, alpha, pullUpLoading) => {
      // 防止上拉连续上拉多次之前请求还未响应~
      if (pullUpLoading) {
        return;
      }
      dispatch(actionCreators.updatePullUpLoading(true));
      if (category === '' && alpha === '') {
        dispatch(actionCreators.getMoreHotSingerList());
      } else {
        dispatch(actionCreators.getMoreFilterSingerList(category, alpha));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));
