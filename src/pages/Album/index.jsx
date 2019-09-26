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
  StyledAlbumSongList,
  StyledAlbumSongItem,
} from './styled';
import MyHeader from '../../base/Header';
import Scroll from '../../base/Scroll';
import Loading from '../../base/Loading';
import { getCount, isEmptyObject, getName } from '../../common/js/utils';
import * as actionCreators from './store/actionCreators';
import CommonStyle from '../../common/styled/common-styled';

const HEADER_HEIGHT = 45;

const Album = ({
  history,
  match,
  currentAlbum: currentAlbumImmutable,
  getDataLoading,
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
      <StyledAlbumContainer>
        <MyHeader
          ref={headerEl}
          title={headerTitle}
          handleClick={handleClickToBack}
        />
        {
          !isEmptyObject(currentAlbum) ? (
            <Scroll onScroll={handleScroll}>
              <div>
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
                <StyledAlbumSongList showBackground>
                  <div className="first-line">
                    <div className="play-all">
                      <i className="iconfont">&#xe6e3;</i>
                      <span>
                    播放全部
                        <span className="sum">
                      (共
                          {currentAlbum.tracks.length}
                      首)
                        </span>
                      </span>
                    </div>
                    <div className="add-list">
                      <i className="iconfont">&#xe62d;</i>
                      <span>
                  收藏(
                        {getCount(currentAlbum.subscribedCount)}
                      )
                      </span>
                    </div>
                  </div>
                  <StyledAlbumSongItem>
                    {
                      currentAlbum.tracks.map((item, index) => {
                        return (
                          <li key={item.name}>
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
              </div>
            </Scroll>
          ) : ''
        }
        {
          getDataLoading ? <Loading /> : ''
        }
      </StyledAlbumContainer>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => {
  return {
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    getDataLoading: state.getIn(['album', 'getDataLoading']),
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
