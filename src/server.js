const express = require("express");
const { connectDB, client } = require("./db");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

// ✅ Serve static files from ROOT/public (1 level  from src)
app.use(express.static(path.join(__dirname, "../public")));

async function insertData(collectionName, dataObj) {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(dataObj);
    console.log(`✅ Document inserted with _id: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to insert data");
  } finally {
    await client.close();
    console.log("❌ Connection closed.");
  }
}

app.post("/addFeedback", async (req, res) => {
  try {
    const dataObj = req.body;

    if (!dataObj) {
      return res.status(400).send({ error: "Data object is required." });
    }

    const result = await insertData("feedback", dataObj);
    res.status(200).send({
      message: "Data inserted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post("/contact", async (req, res) => {
  try {
    const dataObj = req.body;

    if (!dataObj) {
      return res.status(400).send({ error: "Data object is required." });
    }

    const result = await insertData("contactus", dataObj);
    res.status(200).send({
      message: "Data inserted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
