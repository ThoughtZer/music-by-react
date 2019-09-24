import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledRankContainer = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .official,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${CommonStyle['font-size-m']};
    color: ${CommonStyle['font-color-desc']};
  }
`;

export const StyledRankList = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${(props) => (props.globalRank ? 'flex' : '')};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  &::after{
    content:"";
    display:block;
    width: 32vw;
  }
`;

export const StyledRankListItem = styled.li`
  display: ${(props) => (props.tracks.length ? 'flex' : '')};
  padding: 3px 0;
  .img-wrapper{
    width:  ${(props) => (props.tracks.length ? '27vw' : '32vw')};
    height: ${(props) => (props.tracks.length ? '27vw' : '32vw')};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update-frequency{
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${CommonStyle['font-size-ss']};
      color: ${CommonStyle['font-color-light']};
    }
  }
`;

export const StyledRankSongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  & > li{
    font-size: ${CommonStyle['font-size-s']};
    color: grey;
  }
`;
