import React, {
  memo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyledProgressBarWrapper,
} from './styled';
import { prefixStyle } from '../../common/js/utils';

const progressBtnWidth = 16;

const transform = prefixStyle('transform');

const ProgressBar = ({
  percent,
  handleUpdateProgress,
}) => {
  const progressBar = useRef(null);
  const progress = useRef(null);
  const progressBtn = useRef(null);
  const [touch, setTouch] = useState({});

  const handleChangePercent = useCallback(() => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    handleUpdateProgress(curPercent);
  }, [handleUpdateProgress]);

  const _offset = useCallback((offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  }, []);

  const handleProgressTouchStart = useCallback((e) => {
    const startTouch = {};
    startTouch.initiated = true; // initial为true表示滑动动作开始了
    startTouch.startX = e.touches[0].pageX; // 滑动开始时横向坐标
    startTouch.left = progress.current.clientWidth; // 当前progress长度
    setTouch(startTouch);
  }, []);

  const handleProgressTouchMove = useCallback((e) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  }, [_offset, touch.initiated, touch.left, touch.startX]);

  const handleProgressTouchEnd = useCallback(() => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);

    handleChangePercent();
  }, [handleChangePercent, touch]);

  const handleProgressClick = useCallback((e) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);

    handleChangePercent();
  }, [_offset, handleChangePercent]);

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent, touch.initiated]);

  return (
    <StyledProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={handleProgressClick}>
        <div className="progress" ref={progress} />
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={handleProgressTouchStart}
          onTouchMove={handleProgressTouchMove}
          onTouchEnd={handleProgressTouchEnd}
        >
          <div className="progress-btn" />
        </div>
      </div>
    </StyledProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  handleUpdateProgress: PropTypes.func,
  percent: PropTypes.number,
};

export default memo(ProgressBar);
