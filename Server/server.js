const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const db = require("./Db");
const authroute = require("./Routes/Authroutes")
const protectedroute = require("./Routes/Protectedroute")
const app = express();
const { port } = require('./config');
const PORT = port;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Backend Running'));
app.use('', authroute);
app.use('/protected', protectedroute);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
