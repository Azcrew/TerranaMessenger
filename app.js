const app = require('./config/server');
const consign = require('consign');
const fs = require('fs');
const https = require('https');
const socket = require('socket.io');

const credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/azcrew.ddns.net/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/azcrew.ddns.net/fullchain.pem', 'utf8')
};

const server = https.createServer(credentials, app).listen(8000, () => {
    console.log('HTTPS Messenger Running');
});

const io = socket.listen(server);
consign()
    .include('./socket')
    .into(io);

