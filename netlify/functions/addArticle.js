const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  const { category, article } = JSON.parse(event.body);
  console.log(article)

  if (!category || !article) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Category and article are required." }),
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

    // Add the new article to the category
    document[category].push(article);

    // Update the document in the database
    await collection.updateOne({}, { $set: { [category]: document[category] } });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Article added successfully" }),
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
