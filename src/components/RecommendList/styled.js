import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${CommonStyle['font-color']};
  }
`;
export const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const StyledListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
  width: 98%;
  /* border-bottom: 1px solid #d6dbdb; */
  border-bottom: 1px dotted ${CommonStyle['theme-color-shadow']};

  .img {
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
  }

  .play-count {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    line-height: 20px;
    font-size: ${CommonStyle['font-size-m']};

    .count {
       color: ${CommonStyle['font-color-desc-v2']};
       font-size: ${CommonStyle['font-size-s']};
      .play{
        vertical-align: top;
        margin-right: 5px;
      }
    }

    .desc {
       margin-bottom: 10px;
       color: ${CommonStyle['font-color-desc']};
    }
  }
`;
