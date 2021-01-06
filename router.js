const fs = require('fs');
const path = require('path');

const requestHandler = (req, res) => {
    // console.log(req);

    //build file path
    let filePath = path.join(
        __dirname,
        'views',
        req.url === '/' ? 'index.html' : req.url
    );

    //extension of file
    let extName = path.extname(filePath);

    //initial content type
    let contentType = 'text/html';

    //check ext and set the proper content type
    switch(extName){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //read file
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                //page not found
                fs.readFile(path.join(
                    __dirname,
                    'views',
                    '404.html'
                ), (err, content) => {
                    res.setHeader('Content-Type', 'text/html');
                    res.end(content, 'utf8');
                })
            }else{
                //some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        }else{
            res.setHeader('Content-Type', contentType);
            res.end(content, 'utf8');
        }
    })

}

module.exports = requestHandler;