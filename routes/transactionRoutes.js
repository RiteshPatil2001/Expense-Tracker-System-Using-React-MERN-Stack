const express = require('express')
const { loginController, registerController } = require('../controllers/userController')
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController")
const { get } = require('mongoose')

//router object
const router = express.Router()

//Routers
//add transaction post method
router.post('/add-transaction', addTransaction)

//delete transaction post method
router.post('/delete-transaction', deleteTransaction)

//edit transaction post method
router.post('/edit-transaction', editTransaction)

//get transaction
router.post('/get-transaction', getAllTransaction)



module.exports = router 