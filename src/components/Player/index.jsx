import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import Toast from '../../base/Toast';
import {
  getSongUrl, isEmptyObject, findIndex, shuffle,
} from '../../common/js/utils';
import { playMode } from '../../api/local';

const Player = ({
  playing,
  fullScreen,
  currentIndex,
  mode,
  playList: immutablePlayList,
  sequencePlayList: immutableSequencePlayList,
  currentSong: immutableCurrentSong,
  toggleFullScreenDispatch,
  togglePlayingDispatch,
  changeCurrentIndexDispatch,
  changeCurrentDispatch,
  changeModeDispatch,
  changePlayListDispatch,
}) => {
  const handleClickPlaying = useCallback((e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  }, [togglePlayingDispatch]);
  const [modeText, setModeText] = useState('');

  const toastRef = useRef(null);

  const [preSong, setPreSong] = useState({});
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  // 歌曲播放进度
  const percent = Number.isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // 当前歌曲
  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const audioRef = useRef(null);

  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, [changeCurrentIndexDispatch]);

  useEffect(() => {
    if (!playList.length
      || currentIndex === -1
      || !playList[currentIndex]
      || playList[currentIndex].id === preSong.id
    ) return;
    const current = playList[currentIndex];
    setPreSong(current);
    changeCurrentDispatch(current); // 赋值currentSong
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    togglePlayingDispatch(true); // 播放状态
    setCurrentTime(0); // 从头开始播放
    // eslint-disable-next-line no-bitwise
    setDuration((current.dt / 1000) | 0);// 时长
  }, [
    changeCurrentDispatch,
    currentIndex,
    currentSong,
    playList,
    preSong.id,
    togglePlayingDispatch,
  ]);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const handleUpdateTime = useCallback((e) => {
    setCurrentTime(e.target.currentTime);
  }, []);

  const handleUpdateProgress = useCallback((curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }, [duration, playing, togglePlayingDispatch]);

  const handleLoop = useCallback(() => {
    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play();
  }, [togglePlayingDispatch]);

  const handlePrev = useCallback(() => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }, [
    changeCurrentIndexDispatch,
    currentIndex,
    handleLoop,
    playList.length,
    playing,
    togglePlayingDispatch,
  ]);

  const handleNext = useCallback(() => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }, [
    changeCurrentIndexDispatch,
    currentIndex,
    handleLoop,
    playList.length,
    playing,
    togglePlayingDispatch,
  ]);

  const hanldeChangeMode = useCallback(() => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText('顺序循环');
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText('单曲循环');
    } else if (newMode === 2) {
      // 随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText('随机播放');
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  }, [
    changeCurrentIndexDispatch,
    changeModeDispatch,
    changePlayListDispatch,
    currentSong,
    mode,
    sequencePlayList,
  ]);

  const handleAudioEnd = useCallback(() => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  }, [handleLoop, handleNext, mode]);

  return (
    <>
      {
        !isEmptyObject(currentSong) ? (
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            toggleFullScreen={toggleFullScreenDispatch}
            handleClickPlaying={handleClickPlaying}
            duration={duration}// 总时长
            currentTime={currentTime}// 播放时间
            percent={percent}
          />
        ) : null
      }
      {
        !isEmptyObject(currentSong) ? (
          <NormalPlayer
            mode={mode}
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            toggleFullScreen={toggleFullScreenDispatch}
            handleClickPlaying={handleClickPlaying}
            duration={duration}// 总时长
            currentTime={currentTime}// 播放时间
            percent={percent}
            handleUpdateProgress={handleUpdateProgress}
            handlePrev={handlePrev}
            handleNext={handleNext}
            hanldeChangeMode={hanldeChangeMode}
          />
        ) : null
      }
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onTimeUpdate={handleUpdateTime}
      />
      <Toast text={modeText} ref={toastRef} />
    </>
  );
};

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
});

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(actionCreators.updatePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(actionCreators.updateFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(actionCreators.updateShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(actionCreators.updateCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(actionCreators.updateCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(actionCreators.updatePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(actionCreators.updatePlayList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Player));
