const express = require('express');
const router = express.Router();

const customerController = require("../controllers/customerController")


router
    .route('/')
    .get(customerController.getCustomersData)
    .post(customerController.newData);

router
    .route("/:id")
    .get(customerController.getCustomerDatabyid)
    .patch(customerController.updateData)
    .delete(customerController.deleteData)

module.exports = router;