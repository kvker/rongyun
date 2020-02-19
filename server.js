const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const axios = require('axios')
const qs = require('qs')
const { SHA1, enc } = require('crypto-js')
const app = express()

app.use(express.static(path.join(__dirname, './')))

const app_secret = 'JqFQr9GBHpWiT'
const app_key = '0vnjpoad03jyz'

// parse application/json
app.use(body_parser.json())

const signAppKey = (nonce, timestamp) => {
  let base = app_secret + nonce + timestamp
  return enc.Hex.stringify(SHA1(base))
}

app.post('/api/token', async (req, res) => {
  try {
    let timestamp = new Date().getTime()
    let nonce = String(timestamp)
    let signature = signAppKey(nonce, timestamp)
    let ret = await axios({
      method: 'post',
      url: 'http://api-cn.ronghub.com/user/getToken.json',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'App-Key': app_key,
        Nonce: nonce,
        Timestamp: timestamp,
        Signature: signature,
      },
      // 1: root, 2: test
      data: qs.stringify(req.body),
    })
    // console.log({ ret })
    res.json({
      code: 200,
      result: {
        token: ret.data.token,
      },
    })
  } catch(error) {
    console.log(error.message)
  }
})

app.listen(8888, () => {
  console.log(`api run in 8888 port.`)
})