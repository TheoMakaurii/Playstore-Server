const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const apps= require('./playstore-data');


app.get('/apps', (req, res)=>{
  const {search ='', sort} = req.query;

  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res
      .status(400)
      .send('Sort must be one of app or rating');
    }
  }

  let results= apps
    .filter(playstore=>
      playstore
        .Price
        .toLowerCase()
        .includes(search.toLowerCase()));

        if (sort){
          results.sort((a, b)=> {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
          });
        }
  res 
    .json(results);
});

app.listen(8000, ()=> {
    console.log('Server started on PORT 8000!!');
})