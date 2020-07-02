/*
 * Ensure that server.js is always exists in /dist folder for first running server start command
 * */

const fs = require('fs');
const path = require('path');

const dist = path.resolve('dist');
const distServer = path.resolve('dist/server');
const filePath = path.resolve('dist/server/server.js');

if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}
if (!fs.existsSync(distServer)) {
    fs.mkdirSync(distServer);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, ' ', { encoding: 'utf-8', flag: 'w' });
}
