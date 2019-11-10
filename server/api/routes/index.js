const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../../config');

const authRoute = require('./auth.route');
const recordRoute = require('./record.route');
const userRoute = require('./user.route');
const typeRoute = require('./type.route');
const subcategoryRoute = require('./subcategory.route');
const sceneRoute = require('./scene.route');
const serviceRoute = require('./service.route');
const profileRoute = require('./profile.route');

const router = express.Router();
const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
router.use('/records', authMiddleware, recordRoute);
router.use('/users', authMiddleware, userRoute);
router.use('/profile', authMiddleware, profileRoute);
router.use('/type',  typeRoute);
router.use('/scene',  sceneRoute);
router.use('/subcategory',  subcategoryRoute);
router.use('/service',  serviceRoute);

module.exports = router;
