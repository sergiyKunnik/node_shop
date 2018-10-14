const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./user/user.router');
const productRouter = require('./shop/routers/product.router');
const categoryRouter = require('./shop/routers/category.router');
mongoose.connect(
    'mongodb://localhost/NodeShop',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }, () =>{
        console.log('Connect to MongoDb...');
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
// CONFIG URL

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})
// END CONFIG URL
module.exports = app;