import React from 'react';
import { Redirect } from 'react-router';
import Home from '../pages/Home';
import Rank from '../pages/Rank';
import Singers from '../pages/Singers';
import Singer from '../pages/Singer';
import Recommend from '../pages/Recommend';
import Album from '../pages/Album';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          return (
            <Redirect to="/Recommend" />
          );
        },
      },
      {
        path: '/recommend',
        component: Recommend,
        children: [
          {
            path: '/recommend/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/singers',
        component: Singers,
        children: [
          {
            path: '/singers/:id',
            component: Singer,
          },
        ],
      },
      {
        path: '/rank',
        component: Rank,
        children: [
          {
            path: '/rank/:id',
            component: Album,
          },
        ],
      },
    ],
  },
];
