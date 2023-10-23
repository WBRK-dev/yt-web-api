const express = require("express");
const app = express();

// app.use((req, res, next) => {res.setHeader("Access-Control-Allow-Origin", "192.168.178.21"); next()});
app.use((req, res, next) => {res.setHeader("Access-Control-Allow-Origin", "*"); next()});

app.get("/homefeed", require("./api/homefeed.js"));
app.get("/videoinfo", require("./api/videoinfo.js"));
app.get("/rawvideo", require("./api/rawvideo.js"));

app.get("/proxy/dash", require("./api/dash.proxy.js"));
app.get("/proxy/get", require("./api/get.proxy.js"));

app.listen(8080, () => console.log("Listening on 8080"));