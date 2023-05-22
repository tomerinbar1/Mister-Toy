
import { storageService } from './async-storage.service.js'
// import buzz from '../assets/img/toys/buzz.jpg'
// import woody from '../assets/img/toys/woody.jpg'
// import jessie from '../assets/img/toys/jessie.jpg'
// import rex from '../assets/img/toys/rex.jpg'

const STORAGE_KEY = 'toysDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

_createToys()

export const toyService = {
  getToys,
  getToyById,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
}

function getToys(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then(toys => {
    // if (filterBy.title) {
    //   const regExp = new RegExp(filterBy.title, 'i')
    //   toys = toys.filter(toy => regExp.test(toy.title))
    // }

    // if (filterBy.maxPrice) {
    //   toys = toys.filter(toy => toy.listPrice.amount >= filterBy.maxPrice)
    // }
    return toys
  })
}

function getToyById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
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

function getDefaultFilter() {
  return {}
}

function _createToys() {
  // storageService.get(STORAGE_KEY, toys => {
  //   if (!toys || !toys.length) {
  //     toys = _getToys()
  //     storageService.post(STORAGE_KEY, toys)
 
  const toys = [
    _createToy(
      'p101',
      'Buzz LightYear',
      // `${buzz}`,
      18.99,
      ['hero', 'Battery Powered'],
      1551133930594,
      true
    ),
    _createToy(
      'p102',
      'Woody',
      // `${woody}`,
      15.99,
      ['cowboy', 'Pull-String'],
      1551133930595,
      true
    ),
    _createToy(
      'p103',
      'Jessie',
      // `${jessie}`,
      17.99,
      ['cowgirl', 'Battery Powered'],
      1551133930596,
      false
    ),
    _createToy(
      'p104',
      'Rex',
      // `${rex}`,
      12.99,
      ['dinosaur', 'Battery Powered'],
      1551133930597,
      true
    ),
  ]
  storageService.save(STORAGE_KEY, toys)
}

function _createToy(_id, name, imgUrl, price, labels, createdAt, inStock) {
  const toy = {
    _id,
    name,
    imgUrl,
    price,
    labels,
    createdAt,
    inStock,
  }
  return toy
}
