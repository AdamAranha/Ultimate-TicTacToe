
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

// app.get('/', (req, res) => {
//     res.send('Hello')
// })

app.listen(PORT, () => console.log(`Listening on https://localhost:${PORT}`));