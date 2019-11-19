console.log ('hello world lets get this going');

// creating our server connection with express
const express = require('express');

const app = express();
const port = 4000;

app.get('/', (req,res) => res.send('hello world'));


// create error 404 page if requested page by user is not available
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);

});

// final end point if the 404 error is not displayed
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ 
    err: err.message || "Something is wrong"
    });
});

app.listen(port, console.log(`Server started on port ${port}`));