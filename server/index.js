console.log ('hello world lets get this going');

// creating our server connection with express
const express = require('express');
const handle = require('./handlers/index');

const app = express();
const port = 4000;

app.get('/', (req,res) => res.send('hello world'));


// create error 404 page if requested page by user is not available
app.use(handle.notFound);

// final end point if the 404 error is not displayed
app.use(handle.errors);

app.listen(port, console.log(`Server started on port ${port}`));