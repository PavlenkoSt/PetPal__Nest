import { MongoClient } from 'mongodb';

const getClient = async () => {
  const mongoURL = `mongodb://localhost:27017/PetPal`;

  const client = await MongoClient.connect(mongoURL);

  return client;
};

// dont forget to specify collection
const COLLECTION_NAME = '';

export const up = async () => {
  const client = await getClient();
  const db = client.db();

  const bulkOps = [];

  const collection = db.collection(COLLECTION_NAME);

  const docs = await collection.find({}).toArray();

  docs.forEach((doc) => {
    const update = {};

    bulkOps.push({
      updateOne: {
        filter: {
          _id: doc._id,
        },
        update,
      },
    });
  });

  if (bulkOps.length > 0) {
    await collection.bulkWrite(bulkOps);
  }

  client.close();
};

export const down = async () => {
  const client = await getClient();
  const db = client.db();

  const bulkOps = [];

  const collection = db.collection(COLLECTION_NAME);

  const docs = await collection.find({}).toArray();

  docs.forEach((doc) => {
    const update = {};

    bulkOps.push({
      updateOne: {
        filter: {
          _id: doc._id,
        },
        update,
      },
    });
  });

  if (bulkOps.length > 0) {
    await collection.bulkWrite(bulkOps);
  }

  client.close();
};
