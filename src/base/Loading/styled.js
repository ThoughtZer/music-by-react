import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

export const StyledLoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0 0;
  .desc {
    line-height: 20px;
    font-size: ${CommonStyle['font-size-s']};
    color: ${CommonStyle['font-color']};
  }
`;
