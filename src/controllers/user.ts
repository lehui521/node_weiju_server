const router = require("koa-router")()
const axios = require("axios")
const WXBizDataCrypt = require('../weixin/WXBizDataCrypt.js')



const login_user = async function (ctx: any, next: any) {
    console.log("参数",ctx.request.body)
    const appid:string="wxa684740669598d67"
    const secret:string ="7ddeac2dbf99afab1985edeb4b83dde8"
    let iv = ctx.request.body.iv
    let encryptedData=ctx.request.body.encryptedData
    let result:any= await axios({
        url:`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`,
        method:"GET"
    })
    let pc = new WXBizDataCrypt(appid, result.data.session_key)
    let data = pc.decryptData(encryptedData , iv)
    console.log(data)
    await next()
}
const add_user = async function (ctx: any, next: any) {
    return ctx.response.body={
        status:200,
        message:"请求成功"
    }
    // await next()
}

router.post("/login_user", login_user)
router.post("/add_user", add_user)

module.exports = router