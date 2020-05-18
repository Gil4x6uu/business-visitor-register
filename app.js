const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
const cors = require('cors');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gil4x6uu:e3p2M!D8b46YHNF@cluster0-tudov.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2();

let googleUserData;
let db;
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db("stores");
});


function getAllStores() {
    const collection = client.db("stores").collection('storesDeatails');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        return docs;
    });
}

//return the stores
app.get('/getStores', (req, res) => {
    getAllStores()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/getStoresById', (req, res) => {
    const collection = db.collection('storesDeatails');
    collection.find({ 'id': Number(req.query.id) }).toArray((err, store) => {
        res.send(store);
    })
});

app.post('/addVisitorToStore', (req, res) => {
    const collection = db.collection('storesDeatails');
    collection.update({ id: req.body.storeId }, { $push: { visitores: req.body.visitor } }, (err, message) => {
        res.send(message)
    })

});


app.post('/Login/Savesresponse', (req, res) => {
    const collection = db.collection('storeOwners');
    validateTokenAndGetGoogleUserInfo({ access_token: req.body.authToken })
        .then((result) => {
            if (result.status == 200) {
                collection.findOne({ id: result.data.id })
                    .then((doc) => {
                        if (!doc) {
                            newDoc = result.data;
                            newDoc.store_name = `${result.data.given_name }s stroe`;
                            newDoc.visitores = [];
                            collection.insertOne(newDoc);
                            res.send(newDoc);
                        }
                        else{
                            res.send(doc);
                        }
                    })
                }
            })
        });



async function validateTokenAndGetGoogleUserInfo(token) {
    oauth2Client.setCredentials(token);
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    return this.googleUserData = oauth2.userinfo.get()

}


// LISTEN ON PORT
app.listen(port, () =>
    console.log(`API RUNNING ON LOCALHOST: ${port}`)
);