const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bvqwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Hello From Ema John Server!')
})

client.connect(err => {
    const productsCollection = client.db("emaJohnStore").collection("products");
    console.log('Connected');

    //ADD PRODUCTS
    app.post('/add-products/', (req, res) => {
        console.log(req.body);
        const products = req.body;
        productsCollection.insertMany(products)
            .then(response => {
                console.log(response.insertedCount);
                res.send(response)
            })
    })

    //READ ALL PRODUCTS
    app.get('/products/', (req, res) => {
        productsCollection.find({}).limit(20)
            .toArray((err, document) => {
                res.send(document)
            })
    })

    //READ SINGLE PRODUCT
    app.get('/product/:key', (req, res) => {
        const productKey = req.params.key;
        // console.log(productKey);
        productsCollection.find({ key: productKey })
            .toArray((err, document) => {
                res.send(document[0])
            })
    })

    //READ PRODUCTS BY MULTIPLE KEYS
    app.post('/review-products', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents)
            })

    })



});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})