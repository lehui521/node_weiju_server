const jwt = require("jsonwebtoken")

const secret="I_LOVE_WEIJU_LADFJUBJIUN_FNM"
function create_token(data:any){
    //生成token
    const token =jwt.sign(data, secret, {
        expiresIn: 60*60*1  // 1小时过期
    });
    return token
}
function verify_token(token:string){
    try{
        let code = jwt.verify(token,secret)
        return code
    }catch(e) {
        return false
    }  
}

module.exports={
    create_token,
    verify_token
}