require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const todoRoute = require("./Routes/AllRoute");
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors');
app.use(cors());
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("connection is established");
        }

    })
//middle for all routes
app.use("/", todoRoute);

app.use(express.static(path.join(__dirname, "client", "build")))


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
app.listen(PORT, function () {
    console.log("server started on port 5000");
});

