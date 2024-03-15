// console.log("halo aldi")
const fs = require("fs");
const express = require('express');
const morgan = require('morgan');

const app = express();


const customerRouter = require ("./routes/customerRoutes")
// middleware membaca json dari request body ke kita
app.use(express.json());

// middleware dari third party
app.use(morgan('dev'));

// middleware kita sendiri
app.use((req, res, next) => {
    console.log("ini middleware");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/customers', customerRouter)

module.exports = app




// app.get('/', defaultRouter); // localhost:8000
// app.get('/api/v1/customers', getCustomersData);// api get data all
// app.get('/api/v1/customers/:id', getCustomerDatabyid); // api untuk get data by id
// app.patch('/api/v1/customers/:id', updateData );// api untuk update data
// app.delete('/api/v1/customers/:id', deleteData)// api untuk delete data
// app.post('/api/v1/customers', newData)// api untuk create new data
// shortcut pemanggilan param
    // const {id, name, date} = req.params
    // console.log(id)