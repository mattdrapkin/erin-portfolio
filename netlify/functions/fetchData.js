const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGO_URI;  // Make sure this is set in Netlify environment variables
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const database = client.db('erinArticles');
    const collection = database.collection('erinCollection');

    const data = await collection.find({}).toArray();

    // Return the data as JSON
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: error.message }),
    };
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};
