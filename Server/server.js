//This server should be initialized the build forder
const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 1313;
const path = require('path');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
})

app.use('/TemplateData', express.static('./TemplateData'));
app.use('/Build', express.static('./Build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
