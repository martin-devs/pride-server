const express = require("express");
const {
    getOAuthToken,
    lipaNaMpesaHook,
    lipaNaMpesaOnline,
} = require("../controllers/mpesa");

const router = express.Router();

//route to get the auth token
router.get("/get-auth-token", getOAuthToken);
router.post("/stk-push", lipaNaMpesaOnline);
router.post("/hook", lipaNaMpesaHook);

module.exports = router;
