// console.log("halo aldi")
const fs = require("fs");
const express = require('express');

const app = express();
const PORT = 8000;

// middleware membaca json dari request body ke kita
app.use(express.json())

// read file json
const customers = JSON.parse(
fs.readFileSync(`${__dirname}/data/dummy.json`) 
);

app.get('/', (req,res,next)=>{
    res.send('<h1>hello tes</h1>')
})
app.get('/api/v1/customers', (req,res,next)=>{
    res.status(200).json({
        status:"success",
        totalData : customers.length,
        data: {
            customers,
        },
    });
})

app.post('/api/v1/customers', (req,res)=>{
    console.log(req.body);

    const newCustomer = req.body;
    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(201).json({
            status : "success",
            data : {
                customers : newCustomer
            },
        })
    }
    );
})

app.listen(PORT, () => {
    console.log(`APP running on port : ${PORT}`);
});
