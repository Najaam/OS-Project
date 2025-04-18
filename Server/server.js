const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Backend Running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
