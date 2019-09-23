import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledSingerNavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px 10px;
  overflow: hidden;
`;

export const StyledSingerListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const StyledList = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${CommonStyle['font-color-desc']};
    font-size: ${CommonStyle['font-size-s']};
  }
`;
export const StyledListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 10px;
  align-items: center;
  .img-wrapper {
    margin-right: 20px;
    img{
      border-radius: 5px;
      width: 50px;
      height: 40px;
    }
  }
  .name{
    font-size: ${CommonStyle['font-size-m']};
    color: ${CommonStyle['font-color-desc']};
    font-weight: 500;
  }
`;
