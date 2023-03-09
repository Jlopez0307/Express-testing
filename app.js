const express = require('express');
const app = express();
const cart = require('./routes/cart');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/items', cart);

app.use(function(req, res){
    return new ExpressError("Not Found", 404);
})

app.use(function(err, req,res,next){
    // default status is 500 internal server error
    let status = err.status || 500;

    //set status and alert the user
    return res.status(status).json({
        error: {
            message: err.msg,
            status: status
        }
    });
});

app.listen(3000, () => {
    console.log('App on port 3000');
})

module.exports = app;