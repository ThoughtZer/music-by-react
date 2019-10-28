import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import Home from '../pages/Home';

const LazyRank = lazy(() => import('../pages/Rank'));
const LazySingers = lazy(() => import('../pages/Singers'));
const LazySinger = lazy(() => import('../pages/Singer'));
const LazyRecommend = lazy(() => import('../pages/Recommend'));
const LazyAlbum = lazy(() => import('../pages/Album'));

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

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
        component: SuspenseComponent(LazyRecommend),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(LazyAlbum),
          },
        ],
      },
      {
        path: '/singers',
        component: SuspenseComponent(LazySingers),
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent(LazySinger),
          },
        ],
      },
      {
        path: '/rank',
        component: SuspenseComponent(LazyRank),
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(LazyAlbum),
          },
        ],
      },
    ],
  },
];
