import React, {
  forwardRef,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyledHeaderContainer,
} from './styled';

const MyHeader = forwardRef(({
  handleClick,
  title,
}, ref) => {
  return (
    <StyledHeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      <h1>{title}</h1>
    </StyledHeaderContainer>
  );
});

MyHeader.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
};

MyHeader.defaultProps = {
  handleClick: () => {},
  title: '默认标题',
};

export default memo(MyHeader);
