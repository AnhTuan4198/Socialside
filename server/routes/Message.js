const Express =require('express');
const router = Express.Router({mergeParams:true});

const { createMessage } = require("../handler/Message");

router.route("/").post(createMessage);

module.exports = router;