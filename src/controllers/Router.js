import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import store from 'reducers';

import Home from 'containers/Home';
import Login from 'containers/Login';
import User from 'containers/User';
import Admin from 'containers/Admin';
import Root from 'containers/Root';

// route with role check
const ProtectedRouteRender = (renderProps, Component, role) => {
  const user = store.getState().user.current;
  if(!user || user.role !== role) {
    return (
      <div>
        <h3>No access</h3>
        <p>Please <Link to="/login">login</Link> as <strong>{role}</strong></p>
      </div>
    );
  }
  return <Component {...renderProps} />;
}

export const history = createHistory();

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/app/user',
    render: (renderProps) => ProtectedRouteRender(renderProps, User, 'user'),
    exact: true
  },
  {
    path: '/app/admin',
    render: (renderProps) => ProtectedRouteRender(renderProps, Admin, 'admin'),
    exact: true
  },
  {
    path: '/app/root',
    render: (renderProps) => ProtectedRouteRender(renderProps, Root, 'root'),
    exact: true
  },
];
