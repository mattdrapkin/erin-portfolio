const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const { category, index } = JSON.parse(event.body);

  if (!category || index === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Category and index are required." }),
    };
  }

  try {
    await client.connect();
    const database = client.db('erinArticles');
    const collection = database.collection('erinCollection');

    // Fetch the document
    const document = await collection.findOne({});
    if (!document || !document[category]) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Category or document not found." }),
      };
    }

    // Remove the article from the category
    document[category].splice(index, 1);

    // Update the document in the database
    await collection.updateOne({}, { $set: { [category]: document[category] } });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Article deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  } finally {
    await client.close();
  }
};
