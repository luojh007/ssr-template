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

function templating(html, scripts) {
  const template = fs.readFileSync(path.join(__dirname, '../dist/static/index.html'), 'utf-8');
  return template.replace(/{{html}}/g, html).replace(/{{scrpts}}/, scripts);
}
//把SSR过的组件都转成script标签扔到html里
function generateBundleScripts(bundles) {
  return bundles.filter(bundle => bundle.file.endsWith('.js')).map(bundle => {
    return `<script type="text/javascript" src="${bundle.file}"></script>\n`;
  });
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
      console.log(modules)
      //需要插入的script
      let bundles = getBundles(stats, modules);
      const scripts = generateBundleScripts(bundles);
      console.log(scripts, bundles)
      const body = templating(html, scripts)
      ctx.body = body
    }
  } catch (err) {
    ctx.body = templating({ html: err.message });
  }
  ctx.type = 'text/html';
  return next();
}