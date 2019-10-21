import styled, { keyframes } from 'styled-components';
import CommonStyle from '../../../common/styled/common-styled';

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const StyledMiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  background: ${CommonStyle['highlight-background-color']};
  &.mini-enter{
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active{
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active{
    transform: translate3d(0, 100%, 0);
    transition: all .4s
  }
  .icon{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .img-wrapper{
      width: 100%;
      height: 100%;
      img{
        border-radius: 50%;
        &.play{
          animation: ${rotate} 10s infinite;
          &.pause{
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name{
      margin-bottom: 2px;
      font-size: ${CommonStyle['font-size-m']};
      color: ${CommonStyle['font-color-desc']};
      ${CommonStyle.noWrap()}
    }
    .desc {
      font-size: ${CommonStyle['font-size-s']};
      color: ${CommonStyle['font-color-desc-v2']};
      ${CommonStyle.noWrap()}
    }
  }
  .control{
    flex: 0 0 30px;
    padding: 0 5px;
    .iconfont, .icon-playlist{
      font-size: 20px;
      color: ${CommonStyle['theme-color']};
    }
    .icon-mini{
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play{
        left: 9px
      }
    }
  }
`;
