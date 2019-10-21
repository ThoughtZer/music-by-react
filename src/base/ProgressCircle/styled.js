import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledCircleWrapper = styled.div`
  position: relative;
  circle{
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background{
      transform: scale(0.9);
      stroke: ${CommonStyle['theme-color-shadow']};
    }
    &.progress-bar{
      transform: scale(0.9) rotate(-90deg);
      stroke: ${CommonStyle['theme-color']};
    }
  }
`;
