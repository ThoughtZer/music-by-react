import React, {
  memo,
  useState,
  useCallback,
  useRef,
} from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  StyledAlbumContainer,
  StyledAlbumTopDesc,
  StyledAlbumMenu,
  StyledAlbumSongList,
  StyledAlbumSongItem,
} from './styled';
import MyHeader from '../../base/Header';
import Scroll from '../../base/Scroll';
import { getCount } from '../../common/js/utils';

const Album = ({
  history,
}) => {
  console.log(history);
  const [isShow, setIsShow] = useState(true);

  const handleClickToBack = useCallback(
    () => {
      setIsShow(false);
    },
    [],
  );

  const getName = (list) => {
    let str = '';
    list.map((item, index) => {
      str += index === 0 ? item.name : `/${item.name}`;
      return item;
    });
    return str;
  };

  const header = useRef(null);

  const currentAlbum = {};

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
        <MyHeader ref={header} title="" handleClick={handleClickToBack} />
        <Scroll>
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
      </StyledAlbumContainer>
    </CSSTransition>
  );
};

export default memo(withRouter(Album));
