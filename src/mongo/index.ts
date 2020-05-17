const MongoClient = require("mongodb").MongoClient;
const Url: string = "mongodb://root:Zlp123456@111.229.69.91:27017";
const dbName: string = "weiju";
//连接数据库
const connect = function () {
    return new Promise((reslove, reject) => {
        MongoClient.connect(Url, {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            poolSize: 10,
            bufferMaxEntries: 0,
        }, (err: any, client: any) => {
            if (err) reject(err)
            reslove(client)
        })
    })
}
//查询封装
const findOne = function (collectionName: any, json: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const client: any = await connect()
            let db = client.db(dbName)
            let result = await db.collection(collectionName).findOne(json)
            resolve(result)
            // result.toArray((err: any, docs: any) => {
            //     if (err) reject(err)

            //     reject(docs)
            // })
            client.close()
        } catch (error) {
            reject(error)
        }

    })

}
//插入
const insert = function (collectionName: any, json: any) {
    return new Promise(async (reslove, reject) => {
        try {
            const client: any = await connect()
            let db = client.db(dbName)
            let result = await db.collection(collectionName).insert(json);
            if (result.result.ok === 1) {
                reslove({ code: 200 });
            } else {
                reslove({ code: 500 });
            }
            client.close()
        } catch (error) {
            reject(error)
        }

        // result.toArray((err, docs) => {
        //     // console.log(docs)
        //     if(err) reject(err)
        //     reslove(docs)
        // })
    });
};
module.exports = {
    findOne: findOne,
    insert: insert,
};