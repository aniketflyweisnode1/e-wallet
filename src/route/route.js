
const express = require('express');
const router = express.Router();

const {createAccount, updateDetails}= require("../controllers/walletController");


router.post('/api/createWallet',createAccount)

router.put('/api/updateUser/:walletId',updateDetails)


module.exports= router

