const db = require('./zoo-model')
const router = require('express').Router();

const knex = require('knex');




router.get('/', (req, res) => {
    // get the roles from the database
    db.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });
  
  router.get('/:id', (req, res) => {
    // retrieve a role by id
    db.findById(req.params.id)
    .then(zoos => {
     res.status(200).json(zoos);
   })
   .catch(err => {
     res.status(404).json({message: 'Cannot find by this ID'});
   });
  })
  router.post('/', (req, res) => {
    // add a role to the database
    db.add(req.body)
    .then(zoo => {
      res.status(201).json(zoo)
      })
    .catch(err => {
      res.status(500).json({message: 'Error adding new data'})
    });
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    res.status(422).json({ message: 'name field required' });
  }
  // update roles
  db.update(id, { name })
    .then(zoo => {
      if (zoo) {
        res.json(zoo);
      } else {
        res.status(404).json({ message: 'role not found' });
      }
    })
    .catch(err => {
      res.status(err).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(204).end(); // we could also respond with 200 and a message
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'Zoo not found' });
    });
});

module.exports = router