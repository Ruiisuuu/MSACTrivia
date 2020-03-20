const app = require('./app.js');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// Web Socket connection
wss.on('connection', function connection(ws, request, client) {
    console.log('----------------------')
    console.log(`New client : ${client}`)
    ws.on('message', function message(msg) {
        console.log(`Received message ${msg} from user ${client}`);
    });
});

// Client Authentication
// server.on('upgrade', function upgrade(request, socket, head) {
//     authenticate(request, (err, client) => {
//         if (err || !client) {
//             socket.destroy();
//             return;
//         }
        
//         wss.handleUpgrade(request, socket, head, function done(ws) {
//             wss.emit('connection', ws, request, client);
//         });
//     });
// });
    
server.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`));