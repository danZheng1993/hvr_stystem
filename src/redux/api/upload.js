
let baseURL = "http://192.168.31.207:4000/"
let upload = (uri, method, data) => {
  return fetch(baseURL + uri, {
      method: method,
      body: data
    })
}

module.exports = upload;