import {AsyncStorage} from 'react-native'
let baseURL = "http://192.168.31.207:4000/"
var defaultHeader
defaultHeaders = async () => {
  var auth = await AsyncStorage.getItem('hvr_auth');
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  }

  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'Bearer ' + token
    console.log('token', token)
  } 
  return headers;
}

defaultHeaders().then((header => defaultHeader = header))

let upload = (uri, method, data) => {
  console.log("upload")
  return fetch(baseURL + uri, {
      method: method,
      body: data,
      headers:  Object.assign({}, defaultHeader)
    })
}

module.exports = upload;