const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  const uri = process.env.MONGO_URI; // Ensure this is set in your Netlify environment variables
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Username and password are required." }),
    };
  }

  try {
    await client.connect();
    const database = client.db('erinArticles');
    const users = database.collection('users');

    // Find the user in the database
    const user = await users.findOne({ username });

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid username or password." }),
      };
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid username or password." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Authentication successful" }),
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
