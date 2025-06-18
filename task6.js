const http = require('http');
function requestListener(req, res) {
    console.log(req.url, req.method, req.headers);
    //process.exit();
    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Node.js Server</title></head>');
        res.write('<body><h1>Hello Node.js Server!</h1></body>');
        res.write('</html>');
       return res.end();
    }else if (req.url === '/differntroute'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Node.js Server</title></head>');
        res.write('<body><h1>This is a different route</h1></body>');
        res.write('</html>');
        return res.end();
    }else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Not Found</title></head>');
        res.write('<body><h1>Page not found!</h1></body>');
        res.write('</html>');
    res.end();
    }
}
const server = http.createServer(requestListener);
const port = 3000;
server.listen(port,()=>{
    console.log(`Server is running on adress http://localhost:${port}`);
});