const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const Website = require('./models/websiteModel');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// API endpoint to create a new website entry
app.post('/api/websites', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("DarkPatterns"); 
    const collection = database.collection("websites");

    const { "website-url": websiteUrl, "website-info": websiteInfo } = req.body;
    const newWebsite = { "website-url": websiteUrl, "website-info": websiteInfo };
    const result = await collection.insertOne(newWebsite);
    res.json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

