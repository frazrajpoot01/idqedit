const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function testConnection() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) return console.log('No .env.local found');
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    let uri = '';
    for (const line of lines) {
      if (line.startsWith('MONGODB_URI=')) uri = line.replace('MONGODB_URI=', '').trim();
    }
    await mongoose.connect(uri);
    
    // Check all collections for products
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`Collection "${col.name}" has ${count} documents.`);
      if (count > 0 && col.name === 'products') {
        const docs = await db.collection(col.name).find({}).toArray();
        console.log(docs);
      }
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();
