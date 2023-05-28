const { ObjectId } = require('mongodb')

const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
}

async function query(filterBy = { txt: '' }) {
    try {
        const criteria = {
            name: { $regex: filterBy.txt, $options: 'i' },
        }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne( { _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $push: { msgs: msg } }
        )
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $pull: { msgs: { id: msgId } } }
        )
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}