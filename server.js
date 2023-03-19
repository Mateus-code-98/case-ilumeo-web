
require("dotenv/config");
const express = require('express');
const { resolve } = require('path');
const port = process.env.PORT || 4500
const app = express();

app.use(express.static(resolve(__dirname, './build')));

app.get('/*', function (req, res) {
    res.sendFile(resolve(__dirname, './build/index.html'))
})

app.listen(port, () => console.log(`\n 🚀 - SERVER IS RUNNING ON PORT ${port}`))