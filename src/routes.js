const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const sessionController = require('./controllers/session-controller');
const spotController = require('./controllers/spot-controller');
const dashboardController = require('./controllers/dashboard-controller');
const bookingController = require('./controllers/booking-controller');
const approvalController = require('./controllers/approval-controller');
const rejectionController = require('./controllers/rejection-controller');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', sessionController.store);

routes.get('/spots', spotController.index);
routes.post('/spots', upload.single('thumbnail'), spotController.store);

routes.get('/dashboard', dashboardController.show);

routes.post('/spots/:spot_id/bookings', bookingController.store);

routes.post('/bookings/:booking_id/approvals', approvalController.store);
routes.post('/bookings/:booking_id/rejections', rejectionController.store);

module.exports = routes;