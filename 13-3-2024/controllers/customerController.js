const fs = require('fs');

// read file json
const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/dummy.json`) 
    );
const defaultRouter = (req, res, next) => {
    res.send("<p>hello</p>");
};
const getCustomersData = (req,res,next)=>{
    res.status(200).json({
        status:"success",
        totalData : customers.length,
        requestAt : req.requestTime,
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

module.exports = {
    getCustomerDatabyid,
    getCustomersData,
    updateData,
    deleteData,
    newData,
    defaultRouter,
};