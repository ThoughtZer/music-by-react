import React, {
  memo,
} from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import {
  StyledTop,
  StyledTab,
  StyledTabItem,
} from './styled';
import Player from '../../components/Player';

const Home = ({
  route,
}) => {
  return (
    <>
      <StyledTop>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">只为遇见你</span>
        <span className="iconfont search">&#xe62b;</span>
      </StyledTop>
      <StyledTab>
        <NavLink to="/recommend" activeClassName="selected">
          <StyledTabItem><span>推荐</span></StyledTabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <StyledTabItem><span>歌手</span></StyledTabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <StyledTabItem><span>排行榜</span></StyledTabItem>
        </NavLink>
      </StyledTab>
      { renderRoutes(route.routes) }
      <Player />
    </>
  );
};

export default memo(Home);
