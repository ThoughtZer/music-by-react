import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

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
