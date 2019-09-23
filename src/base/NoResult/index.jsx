import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonStyle from '../../common/styled/common-styled';

const StyledNoResultWrapper = styled.div`
  text-align: center;
  .no-result-text {
    margin-top: 30px;
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
  text: '没有内容了~~o(╥﹏╥)o',
};

export default NoResult;
