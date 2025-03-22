const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Paths to SSL/TLS certificate and private key
const privateKeyPath = path.join('key.pem.key');
const certificatePath = path.join('cert.pem.cer');

const privateKey = fs.readFileSync('/home/ec2-user/Oxyheal/frontend/key.pem.key', 'utf8');
const certificate = fs.readFileSync('/home/ec2-user/Oxyheal/frontend/cert.pem.cer', 'utf8');

const credentials = { key: privateKey, cert: certificate };

app.use(express.static('/home/ec2-user/Oxyheal/frontend'));

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Port for HTTPS server
const httpsPort = 443;

// Start the server
httpsServer.listen(httpsPort, () => {
    console.log(`Server running on https://localhost:${httpsPort}`);
  });