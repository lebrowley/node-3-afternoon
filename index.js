require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      products_controller = require('./products_controller')

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance)     //javascript setter
    console.log('db connected')
}).catch(err => console.log(err));   
//so basically this is a list of functions strung together: massive, then, catch; they all have arguments going in and then their functionality is determined "under the hood" by massive? express? node?


//----------------ENDPOINTS----------------------
app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
});

