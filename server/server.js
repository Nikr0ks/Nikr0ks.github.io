const webs = require('ws');

const server = new webs.Server({port: 3000});
const Players = [];

server.on('connection', ws => {
    Players.push(ws);
    for(i = 0; i <= Players.length; i++){
        Players[i].send(i+50);
    }
});