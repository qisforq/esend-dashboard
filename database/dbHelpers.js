const keys = require('../server/config/keys');
const { Client } = require('pg');

const databaseURI = process.env.DATABASE_URL || keys.herokuPostgresURI

// const client = new Client({
//   connectionString: databaseURI,
//   ssl: true,
// });

// client.connect()
// .then(() => console.log("Connected to database successfully!!"))
// .catch(e => console.error)
// .finally(() => client.end())

async function insertUser(firstName, lastName, googleId) {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });
  const insertUserText = "INSERT INTO users (first_name, last_name, google_profile_id) VALUES ($1, $2, $3);"
  const searchUsersText = "SELECT * FROM users WHERE google_profile_id = $1;"
  
  try {
    await client.connect()
    console.log("Connected to database (insertUser)");
    
    const existingUserResult = await client.query(searchUsersText, [googleId])

    if (existingUserResult.rows.length) {
      console.log(`${firstName} is already in the database`);
      // await client.end()
      return existingUserResult.rows[0]
    } 
    else {
      await client.query(insertUserText, [firstName, lastName, googleId])
      console.log(`Successfully added ${firstName} to users table`)

      const newUserResult = await client.query(searchUsersText, [googleId])
      // await client.end()
      return newUserResult.rows[0]
    }
  } 
  catch (err) {
    console.error('( ͡° ͜ʖ ͡°) insertUser:', err)
  } 
  finally {
    await client.end()
    console.log("Disconnected from database");
  }
}

async function findUserById(id) {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });
  const findUserText = "SELECT * FROM users WHERE id = $1;"
  
  try {
    await client.connect()
    console.log("Connected to database (findUserById)");
    
    const userResult = await client.query(findUserText, [id])
    // await client.end()
    return userResult.rows[0]

  } 
  catch (err) {
    console.error('ʕ⁎̯͡⁎ʔ༄ findUserById:', err)
  } 
  finally {
    await client.end()
    console.log("Disconnected from database");
  }
}

module.exports = {
  insertUser,
  findUserById
}