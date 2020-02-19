const BASE_URL = ''

const http = {
  async request(url = '', data = {}, type = 'GET') {
    type = type.toUpperCase()
    url = BASE_URL + url

    if(type == 'GET') {
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })

      if(dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
    }

    let requestConfig = {
      credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",//请求的模式
      cache: "force-cache"
    }

    if(type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const ret = await response.json()
      if(ret.code === 200) {
        return ret.result
      } else {
        alert(ret.msg)
      }
    } catch(error) {
      throw new Error(error)
    }
  },
  get(url = '', data = {}) {
    return this.request(url, data, 'GET')
  },
  post(url = '', data = {}) {
    return this.request(url, data, 'POST')
  }
}