const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
//路由
const router_user =  require("./controllers/user")

app.use(cors({
    origin: function (ctx:any) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; 
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(bodyParser());//处理post的请求

app.use( async (ctx:any,next:any)=>{
    ctx.response.body="请求错误"
    await next()
})

app.use(router_user.routes())

app.listen(3000);