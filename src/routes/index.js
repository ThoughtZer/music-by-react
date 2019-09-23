import React from 'react';
import { Redirect } from 'react-router';
import Home from '../pages/Home';
import Rank from '../pages/Rank';
import Singers from '../pages/Singers';
import Recommend from '../pages/Recommend';

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
      },
      {
        path: '/singers',
        component: Singers,
      },
      {
        path: '/rank',
        component: Rank,
      },
    ],
  },
];
