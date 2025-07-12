// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Apna connection string
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  console.log("✅ MongoDB connected!");

  // Database ka naam yahan specify karo
  const db = client.db("hotel");
  return db;
}

module.exports = { connectDB, client };
