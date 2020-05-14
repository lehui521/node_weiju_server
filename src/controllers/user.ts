const router = require("koa-router")()


const login_user = async function (ctx: any, next: any) {
    ctx.response.body = {
        code: 200
    }
    await next()
}
const add_user = async function (ctx: any, next: any) {
    return ctx.response.body={
        status:200,
        message:"请求成功"
    }
    // await next()
}

router.get("/login_user", login_user)
router.post("/add_user", add_user)

module.exports = router