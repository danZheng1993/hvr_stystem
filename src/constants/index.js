// const ip = '192.168.1.86'
// const ip = 'localhost'
// const ip = 'ccc88fce3059.ngrok.io'
// const ip = '192.168.0.169'
// const port = 4000
// const baseUrl = `http://${ip}:${port}/`
// const baseUrl = 'https://dry-dawn-50400.herokuapp.com/'
// const baseUrl = 'http://localhost:4000'
// const baseUrl = 'http://192.168.0.169:4000'
const baseUrl = 'http://47.105.53.235/';
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
    // IP: ip
}

export default constants