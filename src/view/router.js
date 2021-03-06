import React from 'react';
import { renderRoutes } from 'react-router-config'
import Loadable from 'react-loadable';
import ScrollToTop from '../components/ScrollToTop'
import Home from "./routes/home";
const { Spin } = require('antd')
// import { Spin } from "antd";
const Root = ({ route }) => (
  <ScrollToTop>
    <Home/>
    {renderRoutes(route.routes)}
  </ScrollToTop>
)
const Loading = ({ error, pastDelay }) => {
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  } else if (pastDelay) {
    return (
      <Spin tip="Loading...">
        <div style={{ height: 500 }} />
      </Spin>
    );
  } else {
    return null;
  }
};
function RootRouter() {
  const routes = [
    {
      component: Root,
      routes: [{
        path: '/index.html',
        component: Loadable({
          loader: () => import('./routes'),
          // modules: ['./routes'],
          // webpack: () => [require.resolveWeak('./routes')],
          loading: Loading,
        })
      },
      {
        path: '/a.html',
        component: Loadable({
          loader: () => import('./routes/a'),
          // modules: ['./routes/a'],
          // webpack: () => [require.resolveWeak('./routes/a')],
          loading: Loading,
        })
      },
      {
        path: '/b.html',
        component: Loadable({
          loader: () => import('./routes/b'),
          // modules: ['./routes/b'],
          // webpack: () => [require.resolveWeak('./routes/b')],
          loading: Loading,
        })
      },
      ]
    }
  ]
  return <div>{renderRoutes(routes)}</div> 
}

export default RootRouter;