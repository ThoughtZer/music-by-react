import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledSingerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  bottom: ${(props) => (props.play > 0 ? '60px' : 0)};
  width: 100%;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;

  &.fade-enter, &.fade-appear{
    transform: translate3d(100%, 0, 0);
  }
  &.fade-enter-active, &.fade-appear-active{
    transition: transform .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fade-exit{
    transform: translate3d(0, 0, 0);
  }
  &.fade-exit-active{
    transition: transform .3s;
    transform: translate3d(100%, 0, 0);
  }
`;

export const StyledImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;

export const StyledCollectButton = styled.div`
  position: absolute;
  left: 0; right: 0;
  margin: -75px auto 0;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  z-index: 50;
  background: ${CommonStyle['theme-color']};
  color: ${CommonStyle['font-color-light']};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`;

export const StyledSongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: ${(props) => (props.songsCount ? '50px' : 0)};
  right: 0;
  & > div{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`;

export const StyledBgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`;

export const StyledLoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
