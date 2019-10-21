import styled from 'styled-components';

export const StyledScrollContent = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.songsCount ? '50px' : 0)};
  width: 100%;
`;
