const fs = require('fs')
var toys = require('../data/toy.json')

async function query(filterBy = {}) {
  let toysToDisplay = toys
  return toysToDisplay
}

function get(toyId) {
  const toy = toys.find(toy => toy._id === toyId)
  if (!toy) return Promise.reject('Toy not found!')
  return Promise.resolve(toy)
}

async function remove(toyId) {
  const idx = toys.findIndex(toy => toy._id === toyId)
  if (idx === -1) return Promise.reject('No Such Toy')
  const toy = toys[idx]
  toys.splice(idx, 1)
  return _saveToysToFile()
}

async function save(toy) {
  if (toy._id) {
    const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
    if (!toyToUpdate) return Promise.reject('No such toy')
    toyToUpdate.name = toy.name
    toyToUpdate.price = toy.price
    toyToUpdate.inStock = toy.inStock
  } else {
    toy._id = _makeId()
    toys.push(toy)
  }

  return _saveToysToFile().then(() => toy)
  // return Promise.resolve(toy)
}

function _makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

async function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    const toysStr = JSON.stringify(toys, null, 2)
    fs.writeFile('data/toy.json', toysStr, err => {
      if (err) {
        return console.log(err)
      }
      console.log('The file was saved!')
      resolve()
    })
  })
}

module.exports = {
  query,
  get,
  remove,
  save,
}
