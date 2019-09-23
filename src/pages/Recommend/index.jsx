import React, {
  memo,
  useRef,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import Slider from '../../components/Slider';
import RecommentList from '../../components/RecommentList';
import Loading from '../../base/Loading';
import Scroll from '../../base/Scroll';
import {
  StyledScrollContent,
} from './styled';
import * as actionCreator from './store/actionCreators';

const Recommend = ({
  bannerList,
  recommendList,
  getBannerListDispatch,
  getRecommendListDispatch,
  getDataLoading,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (!bannerList.size) {
      getBannerListDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDispatch();
    }
  }, [bannerList, recommendList, getBannerListDispatch, getRecommendListDispatch]);

  // redux 中immutable的数据拿出来使用的时候 toJS 一下
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <StyledScrollContent>
      <Scroll ref={scrollRef} onScroll={forceCheck}>
        {/* { scroll 容器元素必须有一个内部的div } */}
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommentList recommendList={recommendListJS} />
          {
            getDataLoading ? <Loading /> : ''
          }
        </div>
      </Scroll>
    </StyledScrollContent>
  );
};

const mapStateToProps = (state) => {
  // 不用在这里将数据toJS,不然每次diff比对props的时候都是不一样的引用,还导致不必要的重渲染,属于滥用immutable
  return {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    getDataLoading: state.getIn(['recommend', 'getDataLoading']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerListDispatch: () => {
      dispatch(actionCreator.getBannerList());
    },
    getRecommendListDispatch: () => {
      dispatch(actionCreator.getRecommendList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
