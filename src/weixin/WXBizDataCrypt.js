var crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedDataStr, iv) {
  // base64 decode
  var sessionKey = Buffer.from(this.sessionKey, 'base64')
  var encryptedData = Buffer.from(encryptedDataStr, 'base64')
  iv = Buffer.from(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer小错')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer报错')
  }

  return decoded
}

module.exports = WXBizDataCrypt
