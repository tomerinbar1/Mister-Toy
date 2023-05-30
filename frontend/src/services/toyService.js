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
  getDefaultSort,
  getDefaultFilter,
}

function getToys(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  const queryParams = `?name=${filterBy.name}&labels=${filterBy.labels.join(
    ','
  )}&inStock=${filterBy.inStock}&sortByVal=${sortBy.value}&sortByChange=${
    sortBy.change
  }`
  return httpService.get(BASE_URL + queryParams)
}

blabla()

async function blabla() {
  const blo = await httpService.get('bla')
  console.log(blo)
}

function getDefaultFilter() {
  return {
    name: '',
    inStock: 'all',
    labels: [],
  }
}

function getDefaultSort() {
  return { value: 'name', change: 1 }
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
    imgURL: '',
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
  'stretchy',
  'fashion doll',
  'bear',
  'triceratops',
  'pod',
  'giggle',
  'stuntman',
  'villain',
  'unicorn',
  'remote control',
  'human',
  'dummy',
  'horse',
  'drawing toy',
  'spork',
  'teapot',
  'doll',
  'clown',
  'piggy bank',
  'alien',
  'Plastic',
  'Pull-Along',
  'Plush',
  'Craft Kit',
  'duck',
  'shepherdess',
]

function getLabels() {
  return labels
}

function getInventory() {
  let inventory = new Array(labels.length).fill(0)

  httpService.get(BASE_URL).then(toys => {
    toys.forEach(toy => {
      toy.labels.forEach(label => {
        const labelIndex = labels.indexOf(label)
        if (labelIndex !== -1) {
          inventory[labelIndex]++
        }
      })
    })
  })
  return []
}

// function getInventory() {
//   let inventory = [0, 0, 0, 0, 0, 0]
//   httpService.get(BASE_URL).then(toys => {
//     toys.forEach(toy => {
//       toy.labels.forEach(label => {
//         if (label === 'hero') inventory[0]++
//         else if (label === 'Battery Powered') inventory[1]++
//         else if (label === 'cowboy') inventory[2]++
//         else if (label === 'Pull-String') inventory[3]++
//         else if (label === 'cowgirl') inventory[4]++
//         else if (label === 'dinosaur') inventory[5]++
//       })
//     })
//   })
//   return inventory
// }
