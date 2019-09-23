import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${CommonStyle['theme-color']};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`;

export const StyledTab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${CommonStyle['theme-color']};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected{
      span{
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`;
export const StyledTabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
