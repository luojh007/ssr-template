import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Switch } from 'react-router-dom'
import RootRouter from '../src/view/router'
import React from 'react'
import path from 'path'
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../dist/react-loadable.json'
// import { Provider } from 'react-redux';
// import store from '../src/store/index'

function templating(html, scripts, css) {
  const template = fs.readFileSync(path.join(__dirname, '../dist/static/index.html'), 'utf-8');
  return template.replace(/{{html}}/g, html).replace(/{{scrpts}}/, scripts).replace(/{{css}}/, css);
}
//把SSR过的组件都转成script,css标签扔到html里
function generateBundleJsAndCss(bundles) {
  let jsAndCssObj = {
    js: '',
    css: '',
  };
  bundles.filter(bundle => {
    if (bundle.file.endsWith('.js')) {
      jsAndCssObj.js += `<script type="text/javascript" src="${bundle.file}"></script>\n`
    } else if (bundle.file.endsWith('.css')) {
      jsAndCssObj.css += `<link rel="stylesheet" href=${bundle.file} type="text/css" />\n`
    }
  });
  return jsAndCssObj;
}
//中间件，构造render方法，添加模版
export default function (ctx, next) {
  try {
    ctx.render = (url) => {
      let modules = [];
      let context = {};
      const html = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter location={url} context={context}>
            {/* <Provider store={store}> */}
            <RootRouter />
            {/* </Provider> */}
          </StaticRouter>
        </Loadable.Capture>
      )
      //需要插入的script
      let bundles = getBundles(stats, modules);
      const { js, css } = generateBundleJsAndCss(bundles);
      const body = templating(html, js, css)
      ctx.body = body
    }
  } catch (err) {
    ctx.body = templating({ html: err.message });
  }
  // ctx.type = 'text/html';
  return next();
}