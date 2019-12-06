const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../../config');

const authRoute = require('./auth.route');
const recordRoute = require('./record.route');
const userRoute = require('./user.route');
const typeRoute = require('./type.route');
const feedbackRoute = require('./feedback.route');
const subcategoryRoute = require('./subcategory.route');
const sceneRoute = require('./scene.route');
const serviceRoute = require('./service.route');
const profileRoute = require('./profile.route');
const jobRoute = require('./job.route');
const chatRoute = require('./chat.route');
const paymentRoute = require('./payment.route');
const newsRoute = require('./news.route');
const bannerRoute = require('./banner.route');
const mediaRoute = require('./media.route');
const settingRoute = require('./setting.route');
const invoiceRoute = require('./invoice.route');
const logRoute = require('./log.route');

const router = express.Router();
const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
router.use('/records', authMiddleware, recordRoute);
router.use('/users', authMiddleware, userRoute);
router.use('/profile', authMiddleware, profileRoute);
router.use('/feedbacks', authMiddleware, feedbackRoute);
router.use('/jobs', authMiddleware, jobRoute);
router.use('/chats', authMiddleware, chatRoute);
router.use('/payments', authMiddleware, paymentRoute);
router.use('/invoices', authMiddleware, invoiceRoute);
router.use('/logs', authMiddleware, logRoute);
router.use('/medias', authMiddleware, mediaRoute);

router.use('/types', typeRoute);
router.use('/scenes', sceneRoute);
router.use('/subcategorys', subcategoryRoute);
router.use('/services', serviceRoute);
router.use('/news', newsRoute);
router.use('/banners', bannerRoute);
router.use('/settings', settingRoute);

module.exports = router;
