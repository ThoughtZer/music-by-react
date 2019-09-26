import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledHeaderContainer = styled.div`
  position: fixed;
  padding: 0 10px;
  margin-bottom: 5px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  box-sizing: border-box;
  color: ${CommonStyle['font-color-light']};
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  .back{
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  & > h1{
    font-size: ${CommonStyle['font-size-l']};
    font-weight: 700;
    position: relative;
    text-align: center;
    left: -10px;
    width: 100%;
  }
`;
