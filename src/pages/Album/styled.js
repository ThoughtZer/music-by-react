import styled from 'styled-components';

export const StyledAlbumContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;
  
  &.fade-enter, &.fade-appear{
    transform: translate3d(100%, 0, 0);
  }
  &.fade-enter-active, &.fade-appear-active{
    transition: transform .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fade-exit{
    transform: translate3d(0, 0, 0);
  }
  &.fade-exit-active{
    transition: transform .3s;
    transform: translate3d(100%, 0, 0);
  }
`;
