import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledAlbumContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;

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

export const StyledAlbumTopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;

  .background{
    z-index: -1;
    background-image: url(${(props) => props.background});
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter{
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img-wrapper{
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play-count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${CommonStyle['font-size-s']};
      line-height: 15px;
      color: ${CommonStyle['font-color-light']};
      .play{
        vertical-align: top;
      }
    }
    img{
      width: 120px;
      height: 120px;
      border-radius:3px;
    }
  }
  .desc-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title{
      max-height: 70px;
      color: ${CommonStyle['font-color-light']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${CommonStyle['font-size-l']};
    }
    .person{
      display: flex;
      .avatar{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${CommonStyle['font-size-m']};
        color: ${CommonStyle['font-color-desc-v2']};
      }
    }
  }
`;

export const StyledAlbumMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  & > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${CommonStyle['font-size-s']};
    color: ${CommonStyle['font-color-light']};
    z-index:1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;
