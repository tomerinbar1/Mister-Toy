const toyService = require('./toy.service.js')

const logger = require('../../services/logger.service')

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addToyMsg,
  removeToyMsg,
}

async function getToys(req, res) {
  console.log('req.query:', req.query);
  try {
    logger.debug('Getting toys')
    const filterBy = req.query
    console.log('filterBy:', filterBy)
    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    console.log(toyId)
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  const { loggedinUser } = req

  try {
    const toy = req.body
    toy.owner = loggedinUser
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addToyMsg(req, res) {
  const { loggedinUser } = req
  try {
    const toyId = req.params.id
    // console.log('loggedinUser:',loggedinUser)
    // console.log('req.body:', req.body)
    const { msg } = req.body
    const savedMsg = await toyService.addToyMsg(toyId, msg, loggedinUser)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

async function removeToyMsg(req, res) {
  try {
    const toyId = req.params.id
    const { msgId } = req.params

    const removedId = await toyService.removeToyMsg(toyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy msg', err)
    res.status(500).send({ err: 'Failed to remove toy msg' })
  }
}
