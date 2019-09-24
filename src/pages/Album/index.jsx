import React, {
  memo,
  useState,
} from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  StyledAlbumContainer,
} from './styled';

const Album = ({
  history,
}) => {
  console.log(history);
  const [isShow] = useState(true);
  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="fade"
      appear
      unmountOnExit
      onExited={history.goBack}
    >
      <StyledAlbumContainer>
        123
      </StyledAlbumContainer>
    </CSSTransition>
  );
};

export default memo(withRouter(Album));
