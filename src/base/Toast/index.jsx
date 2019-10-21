import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  StyledToastWrapper,
} from './styled';

const Toast = forwardRef(({
  text,
}, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState('');
  // useImperativeHandle 向外提供通过ref获取组件调用组件方法，在Scroll里面也有
  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(setTimeout(() => {
        setShow(false);
      }, 1000));
    },
  }));
  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <StyledToastWrapper>
        <div className="text">{text}</div>
      </StyledToastWrapper>
    </CSSTransition>
  );
});

export default memo(Toast);
