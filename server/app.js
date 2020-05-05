//处理css
import koa from 'koa'
import routes from './router/index'
import templating from './templating'
import koaStatic from 'koa-static'
import path from 'path'
import Loadable from 'react-loadable'
const app = new koa();




//自定义中间件
app.use(templating)
app.use(routes.routes());
app.use(routes.allowedMethods());

//静态资源！
app.use(koaStatic(path.join(__dirname, '../dist/static'), {
  index: 'root', // 这里配置不要写成'index'就可以了，因为在访问localhost:3030时，不能让服务默认去加载index.html文件，这里很容易掉进坑。
}))

Loadable.preloadAll().then(app.listen(3000, () => {
  console.log('成功启动，端口：3000')
})) 