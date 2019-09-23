const webs = require('ws');

const server = new webs.Server({port: 3000});

server.on('connection', ws => {
    ws.onmessage = Response => console.log(Response.data);
});