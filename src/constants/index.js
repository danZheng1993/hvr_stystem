// const ip = '192.168.1.86'
// const ip = 'localhost'
const ip = 'localhost'
const port = 4000
const baseUrl = `http://${ip}:${port}/`
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
    JID: `@${ip}/spark`,
    IP: ip
}

export default constants