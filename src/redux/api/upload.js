
let baseURL = "http://198.18.16.228:4000/"
let upload = (uri, method, data) => {
  return fetch(baseURL + uri, {
      method: method,
      body: data
    })
}

module.exports = upload;