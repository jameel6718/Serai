const express = require('express');
const { connectDB, client } = require('./db');


const app = express();
const port =  3000;

app.use(express.json());  // Middleware to parse JSON requests

async function insertData(collectionName, dataObj) {
  try {
   
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(dataObj);
    console.log(`✅ Document inserted with _id: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to insert data');
  } finally {
    await client.close();
    console.log("❌ Connection closed.");
  }
}

// API route to insert data into a collection
app.post('/empCreate', async (req, res) => {
  try {
    const  dataObj  = req.body;

    if ( !dataObj) {
      return res.status(400).send({ error: " data object are required." });
    }

    const result = await insertData("emp", dataObj);
    res.status(200).send({ message: "Data inserted successfully", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post('/salaryCreate', async (req, res) => {
  try {
    const  dataObj  = req.body;
    
    if ( !dataObj) {
      return res.status(400).send({ error: " data object are required." });
    }

    const result = await insertData("salary", dataObj);
    res.status(200).send({ message: "salary inserted successfully", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
