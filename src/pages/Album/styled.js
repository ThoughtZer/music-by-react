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

export const StyledAlbumSongList = styled.div`
  padding: 15px 10px;
  border-radius: 17px;
  opacity: 0.98;
  ${(props) => (props.showBackground ? `background: ${CommonStyle['highlight-background-color']}` : '')}
  .first-line{
    box-sizing: border-box;
    padding: 5px 0;
    position: relative;
    justify-content: space-between;
    .play-all{
      display: inline-block;
      line-height: 20px;
      color: ${CommonStyle['font-color-desc']};
      .iconfont {
        font-size: 22px;
        vertical-align: top;
        margin-right: 7px;
      }
      .sum{
        font-size: ${CommonStyle['font-size-s']};
        color: ${CommonStyle['font-color-desc-v2']};
      }
      & > span{
        vertical-align: top;
        font-weight: bold;
      }
    }
    .add-list, .isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top :0;
      bottom: 0;
      line-height: 34px;
      background: ${CommonStyle['theme-color']};
      color: ${CommonStyle['font-color-light']};
      font-size: 0;
      padding: 0 10px;
      border-radius: 17px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px;
      }
      span{
        font-size: 12px;
        line-height: 34px;
      }
    }
    .isCollected{
      display: flex;
      background: ${CommonStyle['background-color']};
      color: ${CommonStyle['font-color-desc']};
    }
}
`;

export const StyledAlbumSongItem = styled.ul`
  margin-top: 10px;
  & > li{
    display: flex;
    height: 60px;
    align-items: center;
    .index{
      flex-basis: 22px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      margin-right: 7px;
    }
    .info{
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      ${CommonStyle.noWrap()}
      & > span{
        ${CommonStyle.noWrap()}
      }
      & > span:first-child{
        color: ${CommonStyle['font-color-desc']};
      }
      & > span:last-child{
        font-size: ${CommonStyle['font-size-s']};
        color: #bba8a8;
      }
    }
  }
`;
