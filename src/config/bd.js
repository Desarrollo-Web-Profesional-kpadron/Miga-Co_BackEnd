require('dotenv').config(); // 1. Carga las variables del .env
const { MongoClient, ServerApiVersion } = require('mongodb');

// 2. Accede a la variable usando process.env
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("¡Conexión exitosa a MongoDB desde variable de entorno!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);