import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledHorizonWrapper = styled.div`
  display: flex;
  align-items: center;
  .title {
    color: grey;
    flex: 0 0 auto;
    margin-right: 5px;
    padding: 5px 0;
    font-size: ${CommonStyle['font-size-m']};
  }
`;

export const StyledHorizonItemList = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;

  & > span:first-of-type {
    
  }
`;

export const StyledHorizonItemListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${CommonStyle['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${CommonStyle['theme-color']};
    border: 1px solid ${CommonStyle['theme-color']};
    opacity: 0.8;
  }
`;
