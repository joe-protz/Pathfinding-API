const express = require('express')
const passport = require('passport')

const Grid = require('../models/grid')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const addIsEditable = require('../../lib/addIsEditable')
const router = express.Router()

// INDEX
// GET /grids
router.get('/grids', requireToken, (req, res, next) => {
  Grid.find()
    .then(grids => {
      // `grids` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one

      return grids.map(grid => {
        grid = grid.toObject()
        grid = addIsEditable(req.user, grid)
        return grid
      })
    })
    // respond with status 200 and JSON of the grids
    .then(grids => res.status(200).json({ grids: grids }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// INDEX OWNED
// GET /my/grids
router.get('/my/grids', requireToken, (req, res, next) => {
  Grid.find({ owner: req.user.id })
    .then(grids => {
      // `grids` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return grids.map(grid => grid.toObject())
    })
    // respond with status 200 and JSON of the grids
    .then(grids => res.status(200).json({ grids: grids }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /grids/5a7db6c74d55bc51bdf39793
router.get('/grids/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Grid.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "grid" JSON
    .then(grid => {
      grid = grid.toObject()
      grid = addIsEditable(req.user, grid)
      return res.status(200).json({ grid })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /grids
router.post('/grids', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.grid.owner = req.user.id

  Grid.create(req.body.grid)
    // respond to succesful `create` with status 201 and JSON of new "grid"
    .then(grid => {
      res.status(201).json({ grid: grid.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /grids/5a7db6c74d55bc51bdf39793
router.patch('/grids/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.grid.owner

  Grid.findById(req.params.id)
    .then(handle404)
    .then(grid => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, grid)

      // pass the result of Mongoose's `.update` to the next `.then`
      return grid.updateOne(req.body.grid)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /grids/5a7db6c74d55bc51bdf39793
router.delete('/grids/:id', requireToken, (req, res, next) => {
  Grid.findById(req.params.id)
    .then(handle404)
    .then(grid => {
      // throw an error if current user doesn't own `grid`
      requireOwnership(req, grid)
      // delete the grid ONLY IF the above didn't throw
      grid.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
