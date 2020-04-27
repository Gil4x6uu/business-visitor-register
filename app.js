const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
const cors = require('cors');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let store;
let stores = [
    { id: '11', name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
]; 



//return the stores
app.get('/getStores', (req, res) => {
    console.log('inside serevr: getStores')
    res.send(stores);
});

app.get('/getStoresById', (req, res) => {
    console.log(`inside serevr: getStoresById - req.body.id  = ${req.query.id}`);
    store = stores.find((store) =>store.id == req.query.id);
    res.send(store);
});


// LISTEN ON PORT
app.listen(port, () => 
console.log(`API RUNNING ON LOCALHOST: ${port}`)
);