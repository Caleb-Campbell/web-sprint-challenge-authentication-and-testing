const db = require('../../data/dbConfig')

async function insert(user) {
    const [user_id] = await db('users').insert(user)
    return db('users').where({id}).first()
}

function getByUsername(username){
    return db('users').where({username}).first()
}

module.exports = {
    insert,
    getByUsername,
  }
  