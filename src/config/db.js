//const mongoose = require('mongoose');

//const connectDB = async () => {
//  try {
//    await mongoose.connect(process.env.MONGO_URI);
//    console.log('✅ MongoDB conectado');
//  } catch (error) {
//  console.error('❌ Error MongoDB:', error);
//    process.exit(1);
//  }
//};

//module.exports = connectDB;



require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB: miga_co");
        return client.db("miga_co"); // Retorna la base de datos lista para usar
    } catch (error) {
        console.error("❌ Error de conexión:", error);
        process.exit(1);
    }
}

module.exports = connectDB;