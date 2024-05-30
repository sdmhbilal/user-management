import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Users = lazy(() => import('../views/users'));
const PageNotFound = lazy(() => import('../views/not-found'));

const PublicRoutes = () => ({
  path: '/',
  children: [{
    path: '/', element: <Navigate to="users" replace />
  }, {
    path: 'users', element: <Users />
  }, {
    path: '*', element: <PageNotFound />
  }]
});

export default PublicRoutes;
