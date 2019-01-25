const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();

const port = process.env.PORT || 80;

app.use(serveStatic(path.join(__dirname, "dist"), { redirect: false }));

app.use("*", express.static(path.join(__dirname, "dist", "index.html")));

app.listen(port);

console.log("ok");
