import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

const StyledNoResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .no-result-text {
    padding: 15px 0;
    font-size: ${CommonStyle['font-size-m']};
    color: ${CommonStyle['font-color-desc']};
  }
`;

const NoResult = ({
  text,
}) => {
  return (
    <StyledNoResultWrapper>
      <p className="no-result-text">
        { text }
      </p>
    </StyledNoResultWrapper>
  );
};

NoResult.propTypes = {
  text: PropTypes.string,
};

NoResult.defaultProps = {
  text: '没有更多内容了~~o(╥﹏╥)o',
};

export default NoResult;
