import React, {
  memo,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyledLoadingWrapper,
} from './styled';
import LoadingGif from './loading.gif';

const Loading = ({
  text,
}) => {
  return (
    <StyledLoadingWrapper>
      <img src={LoadingGif} alt="加载中" width="24" height="24" />
      <p className="desc">{text}</p>
    </StyledLoadingWrapper>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: '正在加载...',
};

export default memo(Loading);
