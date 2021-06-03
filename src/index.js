const express = require('express');
const routes = require('./routes');

const server = express();
const PORT = 3333;

server.use(express.json());
server.use('/api',routes);

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));





 
