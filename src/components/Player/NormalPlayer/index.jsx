import React, {
  memo,
  useRef,
  useCallback,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import PropTypes from 'prop-types';
import { getName, prefixStyle, formatPlayTime } from '../../../common/js/utils';
import {
  StyledNormalPlayerContainer,
  StyledTop,
  StyledBottom,
  StyledCDWrapper,
  StyledMiddle,
  StyledOperators,
  StyledProgressWrapper,
} from './styled';
import ProgressBar from '../../../base/ProgressBar';
import { playMode } from '../../../api/local';

const transform = prefixStyle('transform');

const NormalPlayer = ({
  mode,
  song,
  fullScreen,
  toggleFullScreen,
  percent,
  duration,
  currentTime,
  playing,
  handleClickPlaying,
  handleUpdateProgress,
  handlePrev,
  handleNext,
  hanldeChangeMode,
}) => {
  const normalPlayerRef = useRef(null);
  const cdWrapperRef = useRef(null);

  const _getPosAndScale = useCallback(() => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  }, []);

  const enter = useCallback(() => {
    normalPlayerRef.current.style.display = 'block';
    const { x, y, scale } = _getPosAndScale();// 获取miniPlayer图片中心相对normalPlayer唱片中心的偏移
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: 'translate3d(0, 0, 0) scale(1.1)',
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)',
      },
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    animations.runAnimation(cdWrapperRef.current, 'move');
  }, [_getPosAndScale]);

  const afterEnter = useCallback(() => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  }, []);

  const leave = useCallback(() => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = 'all 0.4s';
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, [_getPosAndScale]);

  const afterLeave = useCallback(() => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = '';
    cdWrapperDom.style[transform] = '';
    // 一定要注意现在要把normalPlayer这个DOM给隐藏掉，因为CSSTransition的工作只是把动画执行一遍
    // 不置为none现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = 'none';
  }, []);

  const getPlayMode = useCallback(() => {
    let content;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
    } else {
      content = '&#xe61b;';
    }
    return content;
  }, [mode]);

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <StyledNormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={`${song.al.picUrl}?param=300x300`}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer" />
        <StyledTop className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </StyledTop>
        <StyledMiddle>
          <StyledCDWrapper ref={cdWrapperRef}>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={`${song.al.picUrl}?param=400x400`}
                alt="歌曲CD"
              />
            </div>
          </StyledCDWrapper>
        </StyledMiddle>
        <StyledBottom className="bottom">
          <StyledProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} handleUpdateProgress={handleUpdateProgress} />
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </StyledProgressWrapper>
          <StyledOperators>
            <div className="icon i-left">
              <i
                className="iconfont"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: getPlayMode() }}
                onClick={hanldeChangeMode}
              />
            </div>
            <div className="icon i-left">
              <i className="iconfont" onClick={handlePrev}>&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={(e) => handleClickPlaying(e, !playing)}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: playing ? '&#xe723;' : '&#xe731;',
                }}
              />
            </div>
            <div className="icon i-right">
              <i className="iconfont" onClick={handleNext}>&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </StyledOperators>
        </StyledBottom>
      </StyledNormalPlayerContainer>
    </CSSTransition>
  );
};

NormalPlayer.propTypes = {
  fullScreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func,
  // playing: PropTypes.bool,
  percent: PropTypes.number,
  // handleClickPlaying: PropTypes.func,
};

export default memo(NormalPlayer);
