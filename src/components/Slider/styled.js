import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledSliderWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before{
    position: absolute;
    top: -200px;
    height: 300px;
    width: 100%;
    background: ${CommonStyle['theme-color']};
  }
  .slider-container{
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav{
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active{
      background: ${CommonStyle['theme-color']};
    }
  }
`;
