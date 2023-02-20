/*
const fs = require("fs")
const http = require("http");
const path = require("path");
const mime = require("mime");
*/

import http from "node:http";
import fs from "fs";
import path from "path";
import mime from "mime";

const port = process.env.PORT || 3000

http.createServer((req, res) => {
	let {url, method} = req;
	let uri = path.join(path.resolve(), "dist", url+(url=="/"?"index.html" : ""))
	
	console.log(method, url)
	if(method !== "GET") return error(res, 400, "Post request not valid !");
	if(!fs.existsSync(uri))
		return error(res, 404, "File not Found");
	
	res.writeHead(200, {
		"Content-Length" : fs.statSync(uri).size,
		"Content-Type" : mime.getType(uri.split("?")[0].split("/").at(-1).split(".").at(-1))
	});
	fs.createReadStream(uri)
	.pipe(res);
})
.listen(port, () => console.log("Server started !"))

function error (res, e_code, e_text) {
	let err = JSON.stringify({code : e_code, message : e_text});
	res.writeHead(e_code, {
		"Content-Length" : err.length,
		"Content-Type" : "text/plain"
	});
	res.end(err);
}