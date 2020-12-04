// const baseUrl = 'http://localhost:4000/'
// const baseUrl = 'http://192.168.0.101:4000/';
const baseUrl = 'http://47.105.53.235/api/';
// const baseUrl = 'http://192.168.0.102:4000';

const PHOTO_SELECTION_OPTIONS = {
  title: '',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  cancelButtonTitle: '取消',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

const constants = {
    SMS_VERIFICATION: 'SMS_VERIFICATION',
    PASSWORD_VERIFICATION: 'PASSWORD_VERIFICATION',
    RECOVER_PASSWORD: 'RECOVER_PASSWORD',
    NORMAL_SIGNUP: 'NORMAL_SIGNUP',
    SEND_SMS: 'SEND_SMS',
    CHECK_SMS: 'CHECK_SMS',
    BASE_URL: baseUrl,
    INVOICE_BASE_URL: `${baseUrl}/invoiceImage/`,
    BANNER_BASE_URL: `${baseUrl}/bannersImage/`,
    NEWS_BASE_URL: `${baseUrl}/newsImage/`,
    MEDIA_BASE_URL: `${baseUrl}/mediaSource/`,
    SPLASH_BASE_URL: `${baseUrl}/splashImage/`,
    MESSAGE_BASE_URL: `${baseUrl}/messageImage/`,
    WECHAT_APP_ID: 'wx396f2ab3d9c48808',
    HEREMAP_API_URL: 'https://revgeocode.search.hereapi.com/v1/revgeocode',
    HEREMAP_API_TOKEN: 'az9j9AkmzwqXkCQA3kULLVTT4D49QbdFW4nQSuuGrlo',
    PHOTO_SELECTION_OPTIONS,
    // IP: ip
}

export default constants