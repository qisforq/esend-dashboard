const keys = require('../server/config/keys');
const { Client } = require('pg');

const databaseURI = keys.herokuPostgresURI;

const useWhitelist = keys.useWhitelist;
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
  const insertUnapprovedUserText = "INSERT INTO unapproved_users (first_name, last_name, google_profile_id) VALUES ($1, $2, $3);"
  const searchUnapprovedUsersText = "SELECT * FROM unapproved_users WHERE google_profile_id = $1;"
  
  try {
    await client.connect()
    console.log("Connected to database (insertUser)");
    
    const existingUserResult = await client.query(searchUsersText, [googleId])

    if (existingUserResult.rows.length) {
      console.log(`${firstName} is already in the database`);
      // return existingUserResult.rows[0]

      // WHITELIST FEATURE: if you are already in the database, you are a whitelisted user! 
      // Return the user info in an object with the whitelist paramater set to true:
      return { whitelisted: true, user: existingUserResult.rows[0] }
    } 
    else if (useWhitelist === 'true') {
      console.log('WHITELIST IS ON!!!!!!!!!!!!!!!!!!!!!')
      // WHITELIST FEATURE: if you are NOT already in the database, you are not a whitelisted user! 
      // Into the unnapproved table you go!
      console.log(`${firstName} is not on the whitelist!`)
      let unapprovedUserResult = await client.query(searchUnapprovedUsersText, [googleId])

      // If user in unnappoved table already, return the user info in an object with the whitelist paramater set to FALSE:
      if (unapprovedUserResult.rows.length) return { whitelisted: false, user: unapprovedUserResult.rows[0] }
      
      // Otherwise, add user to unnaproved table
      await client.query(insertUnapprovedUserText, [firstName, lastName, googleId])
      console.log('Into the UNAPPROVED USERS table they go!');
      
      unapprovedUserResult = (await client.query(searchUnapprovedUsersText, [googleId])).rows[0]
      // Return the user info in an object with the whitelist paramater set to FALSE:
      return { whitelisted: false, user: unapprovedUserResult }
    }
    // UNCOMMENT the below ELSE STATEMENT if you are no longer using a whitelist.
    else if (useWhitelist === 'false') {
      console.log('WHITELIST IS OFF!!!!!!!!!!!!!!!');
      
      await client.query(insertUserText, [firstName, lastName, googleId])
      console.log(`Successfully added ${firstName} to users table`)

      const newUserResult = await client.query(searchUsersText, [googleId])
      return { user: newUserResult.rows[0] }
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
    // console.log("Connected to database (findUserById)");
    const userResult = await client.query(findUserText, [id])
    // await client.end()
    
    return userResult.rows[0]

  } 
  catch (err) {
    console.error('ʕ⁎̯͡⁎ʔ༄ findUserById:', err)
  } 
  finally {
    await client.end()
    // console.log("Disconnected from database");
  }
}

module.exports = {
  insertUser,
  findUserById,
}