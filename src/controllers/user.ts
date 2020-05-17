const router = require("koa-router")()
const axios = require("axios")
const WXBizDataCrypt = require('../weixin/WXBizDataCrypt.js')
const mongo = require("../mongo/index.ts")
const jwtoken = require("../utils/jwt.ts")
const statusCase = require("../utils/status.ts")

class userApi {
    async login_user(ctx: any, next: any) {
        const appid: string = "wxa684740669598d67"
        const secret: string = "7ddeac2dbf99afab1985edeb4b83dde8"
        let iv = ctx.request.body.iv
        let encryptedData = ctx.request.body.encryptedData
        let result: any = await axios({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`,
            method: "GET"
        })
        let pc = new WXBizDataCrypt(appid, result.data.session_key)
        let userData = pc.decryptData(encryptedData, iv)
        let data = await mongo.findOne("user", { openid: userData.openid })
        if (data) {
            ctx.body = statusCase.status_200({data:data})
        } else {
            let token: string = jwtoken.create_token({ openid: userData.openid })
            // let data = await mongo.find("admin", { user: user })
            // if (data.length !== 0) return ctx.response.body = { code: 201, message: status['201'] }
            userData["token"] = token
            delete userData["watermark"]
            let res = await mongo.insert("user", userData)
            if (res.code === 200) ctx.body = { data: userData, code: 200, message: "ok" }
        }
        await next()
    }
}

let userApiCase:userApi = new userApi()
router.post("/login_user", userApiCase.login_user)

module.exports = router