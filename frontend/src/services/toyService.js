// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toysDB'
const BASE_URL = 'toy/'
// _createToys()

export const toyService = {
  getToys,
  getToyById,
  remove,
  save,
  getEmptyToy,
  setSortBy,
  getLabels,
  getInventory,
}

function getToys(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy).then(toys => {
    if (filterBy.name) {
      toys = toys.filter(toy =>
        toy.name.toLowerCase().includes(filterBy.name.toLowerCase())
      )
    }

    if (filterBy.inStock === true) {
      toys = toys.filter(toy => toy.inStock)
    } else if (filterBy.inStock === false) {
      toys = toys.filter(toy => !toy.inStock)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      toys = toys.filter(toy =>
        toy.labels.some(label => filterBy.labels.includes(label))
      )
    }
    return toys
  })
}

function getToyById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function setSortBy(sortBy) {
  return httpService.get(BASE_URL, { sortBy }).then(toys => {
    if (sortBy === 'name') {
      toys.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    } else if (sortBy === 'price') {
      toys.sort((a, b) => {
        return a.price - b.price
      })
    } else if (sortBy === 'createdAt') {
      toys.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    }
    return toys
  })
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

const labels = [
  'hero',
  'Battery Powered',
  'cowboy',
  'Pull-String',
  'cowgirl',
  'dinosaur',
]

function getLabels() {
  return labels
}

function getInventory() {
  let inventory = [0, 0, 0, 0, 0, 0]
  httpService.get(BASE_URL).then(toys => {
    toys.forEach(toy => {
      toy.labels.forEach(label => {
        if (label === 'hero') inventory[0]++
        else if (label === 'Battery Powered') inventory[1]++
        else if (label === 'cowboy') inventory[2]++
        else if (label === 'Pull-String') inventory[3]++
        else if (label === 'cowgirl') inventory[4]++
        else if (label === 'dinosaur') inventory[5]++
      })
    })
  })
  return inventory
}

// function getDefaultFilter() {
//   return {}
// }

// function _createToys() {
//   const toys = [
//     _createToy(
//       'p101',
//       'Buzz LightYear',
//       'https://m.media-amazon.com/images/I/71rL5zB1UZL._AC_SL1500_.jpg',
//       18.99,
//       ['hero', 'Battery Powered'],
//       1551133930594,
//       true
//     ),
//     _createToy(
//       'p102',
//       'Woody',
//       'https://m.media-amazon.com/images/I/61Akyuw5zIL._AC_SL1500_.jpg',
//       15.99,
//       ['cowboy', 'Pull-String'],
//       1551133930595,
//       true
//     ),
//     _createToy(
//       'p103',
//       'Jessie',
//       'https://m.media-amazon.com/images/I/61rz0sdxEML._AC_SL1500_.jpg',
//       17.99,
//       ['cowgirl', 'Battery Powered'],
//       1551133930596,
//       false
//     ),
//     _createToy(
//       'p104',
//       'Rex',
//       'https://m.media-amazon.com/images/I/61OIdq73gNL._AC_SL1200_.jpg',
//       12.99,
//       ['dinosaur', 'Battery Powered'],
//       1551133930597,
//       true
//     ),
//   ]
//   storageService.save(STORAGE_KEY, toys)
// }

// function _createToy(_id, name, imgUrl, price, labels, createdAt, inStock) {
//   const toy = {
//     _id,
//     name,
//     imgUrl,
//     price,
//     labels,
//     createdAt,
//     inStock,
//   }
//   return toy
// }
