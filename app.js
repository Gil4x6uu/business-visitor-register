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
    getStoreById(req.query.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});



app.post('/addVisitorToStore', (req, res) => {
    const collection = db.collection('storesDeatails');
    collection.updateOne({ id: req.body.storeId }, { $push: { visitors: req.body.visitor } }, (err, message) => {
        res.send(message)
    })

});

app.post('/updateVisitorToStore', (req, res) => {
    const collection = db.collection('storesDeatails');
    collection.updateOne({ id: req.body.storeId },
        { $set: { [`visitors.${req.body.visitor.id}`]: req.body.visitor } }, (err, message) => {
            if (message.result.ok === 1) {
                getStoreById(req.body.storeId)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                

            }
            else {

            }

        })

});


app.post('/Login/Savesresponse', (req, res) => {
    const storeOwnersCollection = db.collection('storeOwners');
    const storesDeatailsCollection = db.collection('storesDeatails');
    validateTokenAndGetGoogleUserInfo({ access_token: req.body.authToken })
        .then((googleResult) => {
            if (googleResult.status == 200) {
                storeOwnersCollection.findOne({ id: googleResult.data.id })
                    .then((doc) => {
                        if (!doc) {
                            userDoc = googleResult.data;
                            storesDeatailsCollection.countDocuments({})
                                .then((countResult) => {
                                    userDoc.store_id = countResult + 1;
                                    storeOwnersCollection.insertOne(userDoc);
                                    storeDoc = {};
                                    storeDoc.id = userDoc.store_id;
                                    storeDoc.store_name = `${userDoc.given_name}s store`;
                                    storeDoc.visitors = [];
                                    storesDeatailsCollection.insertOne(storeDoc);
                                    res.send([userDoc, storeDoc]);
                                })


                        }
                        else {
                            storesDeatailsCollection.findOne({ id: doc.store_id })
                                .then((storeDoc) => {
                                    res.send([doc, storeDoc]);
                                });
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
async function getStoreById(storeId) {
    const collection = db.collection('storesDeatails');
    return collection.find({ 'id': Number(storeId) }).toArray();
}
// LISTEN ON PORT
app.listen(port, () =>
    console.log(`API RUNNING ON LOCALHOST: ${port}`)
);