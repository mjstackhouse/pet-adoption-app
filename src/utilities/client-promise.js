import { MongoClient } from 'mongodb';

let client, clientPromise;

// https://authjs.dev/reference/adapter/mongodb
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}
else {
  client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

export default clientPromise;