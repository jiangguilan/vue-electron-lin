const http = require("http");
const express = require("express");
const cors = require("cors");
function webService () {
    this.start = function () {
        let app = express();

        let port = 4449;
        http.createServer(app).listen(port);

        console.log(`electron: web service listen at ${port}`);

        app.use(express.static(__dirname + "/src"));

        app.use(cors({
            origin: "*"
        }));
    }
}

module.exports = new webService();