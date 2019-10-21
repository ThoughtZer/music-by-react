import React, {
  memo,
  useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import {
  StyledMiniPlayerContainer,
} from './styled';
import { getName } from '../../../common/js/utils';
import ProgressCircle from '../../../base/ProgressCircle';

const MiniPlayer = ({
  song,
  fullScreen,
  toggleFullScreen,
  playing,
  percent,
  handleClickPlaying,
}) => {
  const miniPlayerRef = useRef(null);

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none';
      }}
    >
      <StyledMiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="img-wrapper">
            <img className={`play ${playing ? '' : 'pause'}`} src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            { playing
              ? <i className="icon-mini iconfont icon-pause" onClick={(e) => handleClickPlaying(e, false)}>&#xe650;</i>
              : <i className="icon-mini iconfont icon-play" onClick={(e) => handleClickPlaying(e, true)}>&#xe61e;</i>}
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </StyledMiniPlayerContainer>
    </CSSTransition>
  );
};

MiniPlayer.propTypes = {
  fullScreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func,
  playing: PropTypes.bool,
  percent: PropTypes.number,
  handleClickPlaying: PropTypes.func,
};

MiniPlayer.defaultProps = {
  percent: 0,
};

export default memo(MiniPlayer);
