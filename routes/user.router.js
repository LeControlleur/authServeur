const express = require("express")
const { UserCtrl} = require("../controllers")
const router = express.Router()

router.post('/auth', UserCtrl.authenticate)
router.post('/getData', UserCtrl.getData)

router.post('/insertUser', UserCtrl.insertUser)
//  router.post('/updatePassword', UserCtrl.updateUserPassword)


module.exports = router
