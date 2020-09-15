const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const apps= require('./playstore-data');


app.get('/apps', (req, res)=>{
  const {search =''} = req.query;

  let results= apps
    .filter(playstore=>
      playstore
        .Category
        .toLowerCase()
        .includes(search.toLowerCase()));
  res 
    .json(results);
});

app.listen(8000, ()=> {
    console.log('Server started on PORT 8000!!');
})