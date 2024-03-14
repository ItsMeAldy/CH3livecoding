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

const defaultRouter = (req, res, next) => {
    res.send("<p>hello</p>");
};

const getCustomersData = (req,res,next)=>{
    res.status(200).json({
        status:"success",
        totalData : customers.length,
        data: {
            customers,
        },
    });
}

const getCustomerDatabyid = (req,res,next)=>{
    const id = req.params.id

    // menggunakan array method utk membantu menemukan spesifik data
    const customer = customers.find((cust) => cust._id === id);

    res.status(200).json({
        status:"success",
        data: {
            customers,
        },
    });
}

const updateData = (req,res)=>{
    const {id} = req.params.id
    // melakukan pencarian data yg sesuai parameter id
    const customer = customers.find((cust) => cust._id === id)
    const customerIndex = customers.findIndex((cust) => cust._id === id)

    // ada gak cust nya
    if (!customer) {
        return res.status(404).json({
            status: "fail",
            message: "customer not found",
        })
    }

    // kalau ada, update data sesuai req body
    // object assign = menggabungkan objek
    customers[customerIndex] = {...customers[customerIndex], ...req.body}

    // melakukan update di dokumen json nya
    fs.writeFile(`${__dirname}/data/dummy.json`, 
    JSON.stringify(customers), 
    err => {
            res.status(200).json({
            status : "success",
            message : "data berhasil di update",
            data : {
                customer : customer[customerIndex],
                customer,
            },
        });
    })
}

const deleteData = (req,res)=>{
        const {id} = req.params.id
        // melakukan pencarian data yg sesuai parameter id
        const customer = customers.find((cust) => cust._id === id)
        const customerIndex = customers.findIndex((cust) => cust._id === id)

        // ada gak cust nya
        if (!customer) {
            return res.status(404).json({
                status: "fail",
                message: "customer not found",
            })
        }

        // kalau ada, update data sesuai req body
        // object assign = menggabungkan objek
        customers.splice(customerIndex, 1)

        // melakukan update di dokumen json nya
        fs.writeFile(`${__dirname}/data/dummy.json`, 
        JSON.stringify(customers), 
        err => {
                res.status(200).json({
                status : "success",
                message : "data berhasil di hapus",
                data : {
                    customer : customer[customerIndex],
                    customer,
                },
            });
        })
    }

const newData = (req,res)=>{
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
}

// localhost:8000
app.get('/', defaultRouter);

// api get data all
app.get('/api/v1/customers', getCustomersData);

// api untuk get data by id
    app.get('/api/v1/customers/:id', getCustomerDatabyid);

    // shortcut pemanggilan param
    // const {id, name, date} = req.params
    // console.log(id)

// api untuk update data
    app.patch('/api/v1/customers/:id', updateData );
// api untuk delete data
    app.delete('/api/v1/customers/:id', deleteData)

// api untuk create new data
app.post('/api/v1/customers', newData)

app.route('/api/v1/customers/').get(getCustomersData).post(newData);

app
    .route("/api/v1/customers/:id")
    .get(getCustomerDatabyid)
    .patch(updateData)
    .delete(deleteData)

app.listen(PORT, () => {
    console.log(`APP running on port : ${PORT}`);
});
