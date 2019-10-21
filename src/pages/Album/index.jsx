import React, {
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  StyledAlbumContainer,
  StyledAlbumTopDesc,
  StyledAlbumMenu,
} from './styled';
import {
  StyledLoadingWrapper,
} from '../Singer/styled';
import MyHeader from '../../base/Header';
import Scroll from '../../base/Scroll';
import Loading from '../../base/Loading';
import SongList from '../../components/SongList';
import { isEmptyObject } from '../../common/js/utils';
import * as actionCreators from './store/actionCreators';
import CommonStyle from '../../common/styled/common-styled';

export const HEADER_HEIGHT = 45;

const renderTopDesc = (currentAlbum) => {
  return (
    <StyledAlbumTopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter" />
      </div>
      <div className="img-wrapper">
        <div className="decorate" />
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className="play-count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">
            {Math.floor(currentAlbum.subscribedCount / 1000) / 10}
            万
          </span>
        </div>
      </div>
      <div className="desc-wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </StyledAlbumTopDesc>
  );
};

const renderTopMenu = () => {
  return (
    <StyledAlbumMenu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </StyledAlbumMenu>
  );
};

const Album = ({
  history,
  match,
  currentAlbum: currentAlbumImmutable,
  getDataLoading,
  songsCount,
  handleGetAlbumDataDispatch,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');
  const headerEl = useRef(null);

  useEffect(() => {
    const { id } = match.params;
    handleGetAlbumDataDispatch(id);
  }, [handleGetAlbumDataDispatch, match.params]);

  const currentAlbum = currentAlbumImmutable.toJS();

  const handleClickToBack = useCallback(() => {
    setIsShow(false);
  }, []);

  const handleScroll = useCallback((pos) => {
    const minScrollY = -HEADER_HEIGHT;
    const percent = Math.abs(pos.y / minScrollY);
    const headerDom = headerEl.current;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = CommonStyle['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setHeaderTitle(currentAlbum.name);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setHeaderTitle('');
    }
  }, [currentAlbum.name]);

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="fade"
      appear
      unmountOnExit
      onExited={history.goBack}
    >
      <StyledAlbumContainer songsCount={songsCount}>
        <MyHeader
          ref={headerEl}
          title={headerTitle}
          handleClick={handleClickToBack}
        />
        {
          !isEmptyObject(currentAlbum) ? (
            <Scroll onScroll={handleScroll}>
              <div>
                { renderTopDesc(currentAlbum) }
                { renderTopMenu() }
                <SongList
                  songs={currentAlbum.tracks}
                  showCollect
                  collectCount={currentAlbum.subscribedCount}
                />
              </div>
            </Scroll>
          ) : ''
        }
        {
          getDataLoading ? <StyledLoadingWrapper><Loading /></StyledLoadingWrapper> : ''
        }
      </StyledAlbumContainer>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => {
  return {
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    getDataLoading: state.getIn(['album', 'getDataLoading']),
    songsCount: state.getIn(['player', 'playList']).size,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAlbumDataDispatch: (id) => {
      dispatch(actionCreators.updateGetDataLoading(true));
      dispatch(actionCreators.getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(Album)));
