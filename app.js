const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    console.log("Connected to MongoDB!");

    const db = client.db('labdb');
    const users = db.collection('users');

    // CREATE
    await users.insertOne({
      name: 'Alex',
      age: 30
    });

    console.log("User inserted");

    // READ
    const allUsers = await users.find({}).toArray();

    console.log("All users:");
    console.log(allUsers);

    // UPDATE
    await users.updateOne(
      { name: 'Alex' },
      { $set: { age: 31 } }
    );

    console.log("User updated");

    // DELETE
    await users.deleteOne({ name: 'Alex' });

    console.log("User deleted");

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();