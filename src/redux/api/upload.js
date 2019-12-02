import SyncStorage from 'sync-storage';
let baseURL = "http://192.168.31.207:4000/"
defaultHeaders = () => {
  const token = SyncStorage.get('token') || null;
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  } 
  return headers;
}
let upload = (uri, method, data) => {
  console.log("upload")
  return fetch(baseURL + uri, {
      method: method,
      body: data,
      headers:  Object.assign({}, defaultHeaders())
    })
}

module.exports = upload;