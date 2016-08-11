var control        = require('../controllers/control');
var system         = require('../controllers/system');
var express        = require('express');
var router         = express.Router();


// route /api/login
router.post('/login', system.login);

// route /api/status
router.get('/status', system.status);

// route /api/info
router.get('/info', system.info);

// route /api/account/admin/:id
router.get('/account/admin/:id*?', control.profile);

// route /api/account/user/:id
router.get('/account/user/:id*?', control.profile);

// route /api/account/admins/all
router.get('/account/admins/all', control.allAdmin);

// route /api/account/users/all
router.get('/account/users/all', control.allUser);

// route /api/account/admin/add
router.post('/account/admin/add', control.addAdmin);

// route /api/account/user/add
router.post('/account/user/add', control.addUser);

// route /api/account/admin/update
router.post('/account/admin/update', control.update);

// route /api/account/user/update
router.post('/account/user/update', control.update);

// route /api/account/admin/delete
router.post('/account/admin/delete', control.delete);

// route /api/account/user/delete
router.post('/account/user/delete', control.delete);

// route /api/account/admin/suspend
router.post('/account/admin/suspend', control.suspend);

// route /api/account/user/suspend
router.post('/account/user/suspend', control.suspend);

// route /api/account/admin/active
router.post('/account/admin/active', control.active);

// route /api/account/user/active
router.post('/account/user/active', control.active);

module.exports = router;