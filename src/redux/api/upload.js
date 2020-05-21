import SyncStorage from 'sync-storage';
import constants from '../../constants';
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
  return fetch(constants.BASE_URL + uri, {
      method: method,
      body: data,
      headers:  Object.assign({}, defaultHeaders())
    })
}

module.exports = upload;