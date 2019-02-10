const http = require('http');

const fs = require('fs');

const path = require('path');

//Chosen port (This can be changed)
const port = 3000;

console.log(`Starting server on ${port}`);

const validPath = path.resolve('public');

http.createServer(function(req, res) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    //File path is location of request
    var filePath = path.resolve(validPath + req.url);  

    //If resolved path is not in public (Which means user could see other files)
    if(!String(filePath).startsWith(validPath)) {
        filePath = validPath;
    }
    //If request is left empty is left empty then change filePath to index.html
    if(filePath === validPath) {
        filePath += '/index.html';
    }
    //Get extension of filePath
    var ext = path.extname(filePath);
    //Change content type based on extension
    const typeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    
    const contentType = typeMap[ext];

    fs.readFile(filePath, function(err, cont) {
        //If there's an error, 404
        if(err) {
            res.writeHead(404);
            res.end();
        }
        //Otherwise, send response header and content.
        else {
            res.writeHead(200, {'Content-Type': contentType})
            res.write(cont);
            res.end();
        }
    });
}).listen(port);
