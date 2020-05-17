interface statusInterface{
    code?:number,
    data:any,
    message?:string
}
class Status{
    status_200(statusInterface:statusInterface):statusInterface{
        //200返回统一状态
        statusInterface.code=200
        statusInterface.message="ok"
        return statusInterface
    }
}

let StatusCase:Status = new Status()
module.exports = StatusCase