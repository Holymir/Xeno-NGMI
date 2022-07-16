//This server should be initialized in the build forder
const express = require('express');
const app = express();
const { request } = require('graphql-request');
const server = require('http').Server(app);
const port = process.env.PORT || 1313;
const path = require('path');
const queries = require('./queries/queries');
require('dotenv').config();

server.listen(port, function () {
  console.log('Server listening at port %d', port);
})

app.use('/TemplateData', express.static('./TemplateData'));
app.use('/Build', express.static('./Build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getHighScore',async (req,res) => {
  try {
   const { account } = req.query;
   const seasonsQuery = queries.getSeason;
   const scoreQuery = queries.getHighScore;
   const {seasons} = await request(process.env.THE_GRAPH_URL, seasonsQuery,undefined);
   const {player} = await request(process.env.THE_GRAPH_URL, scoreQuery,{
    walletAddress:account,
    id:seasons[0].id,
    scoreId:`${account}-${seasons[0].id}`
   });
   const scores = player ? player.scores : [];
   res.json({
    highScore:scores.length > 0 ? scores[scores.length - 1].score : 0,
   });
  }catch(e){
    console.log(e)
    res.sendStatus(500);
  }
});