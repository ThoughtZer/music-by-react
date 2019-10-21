import React, {
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  StyledSingerContainer,
  StyledImgWrapper,
  StyledCollectButton,
  StyledBgLayer,
  StyledSongListWrapper,
  StyledLoadingWrapper,
} from './styled';
import MyHeader from '../../base/Header';
import SongList from '../../components/SongList';
import Scroll from '../../base/Scroll';
import Loading from '../../base/Loading';
import { HEADER_HEIGHT } from '../Album';
import * as actionCreators from './store/actionCreators';

const Singer = memo(({
  history,
  artist: immutableArtist,
  songs: immutableSongs,
  songsCount,
  getDataLoading,
  getSingerDataDispatch,
  match,
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleClickToBack = useCallback(() => {
    setIsShow(false);
  }, []);

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  useEffect(() => {
    const { id } = match.params;
    getSingerDataDispatch(id);
    // eslint-disable-next-line
  }, []); // 只需要进来页面请求一次

  const collectButtonDom = useRef(null);
  const imageWrapperDom = useRef(null);
  const songScrollWrapperDom = useRef(null);
  const songScrollDom = useRef(null);
  const headerDom = useRef(null);
  const layerDom = useRef(null);
  const initialHeight = useRef(0);

  const OFFSET = 17; // 圆角尺寸

  useEffect(() => {
    const h = imageWrapperDom.current.offsetHeight;
    songScrollWrapperDom.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layerDom.current.style.top = `${h - OFFSET}px`;
    songScrollDom.current.refresh();
  }, []);

  const handleScroll = useCallback((pos) => {
    const height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapperDom.current;
    const buttonDOM = collectButtonDom.current;
    const headerDOM = headerDom.current;
    const layerDOM = layerDom.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style.transform = `scale(${1 + percent})`;
      buttonDOM.style.transform = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style.transform = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style.opacity = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="fade"
      appear
      unmountOnExit
      onExited={history.goBack}
    >
      <StyledSingerContainer>
        {
          getDataLoading ? (<StyledLoadingWrapper><Loading /></StyledLoadingWrapper>) : null
        }
        <>
          <MyHeader
            ref={headerDom}
            title={artist.name}
            handleClick={handleClickToBack}
          />
          <StyledImgWrapper bgUrl={artist.picUrl} ref={imageWrapperDom}>
            <div className="filter" />
          </StyledImgWrapper>
          <StyledCollectButton ref={collectButtonDom}>
            <i className="iconfont">&#xe62d;</i>
            <span className="text">收藏</span>
          </StyledCollectButton>
          <StyledBgLayer ref={layerDom} />
          <StyledSongListWrapper ref={songScrollWrapperDom} songsCount={songsCount}>
            <Scroll ref={songScrollDom} onScroll={handleScroll}>
              <SongList
                songs={songs}
              />
            </Scroll>
          </StyledSongListWrapper>
        </>
      </StyledSingerContainer>
    </CSSTransition>
  );
});

const mapStateToProps = (state) => ({
  artist: state.getIn(['singer', 'artist']),
  songs: state.getIn(['singer', 'songsOfArtist']),
  getDataLoading: state.getIn(['singer', 'getDataLoading']),
  songsCount: state.getIn(['player', 'playList']).size,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(actionCreators.changeEnterLoading(true));
      dispatch(actionCreators.getSingerInfo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
