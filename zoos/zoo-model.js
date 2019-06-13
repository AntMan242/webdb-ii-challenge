const knex = require('knex')

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig);


module.exports = {
    find,
    findById,
    add,
    update,
    remove,
  };
  
  function find() {
      return db('zoos')
  }
  
  function findById(id) {
    return db('zoos')
    .where({ id })
    .first()
  }
  
  function add(zoo) {
      return db('roles')
      .insert(zoo)
      .then((ids) => {
          const [id] = ids;
        
          return db('zoo')
          .where({id})
          .first()

      })
  }
  
  function update(id, changes) {
    return db('zoos')
    .where({ id })
    .update(changes )
    .then(() => {
        return db('zoos')
        .where({ id })
        .first()
    });
    }
  
  function remove(id) {
      return db('zoos')
      .where({id})
      .del();
    }