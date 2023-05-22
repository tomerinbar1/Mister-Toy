import { store } from './store.js'
import { SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY } from './toyReducer.js'
import { toyService } from '../services/toyService.js'

export async function loadToys() {
  return toyService.getToys().then(toys => {
    console.log('toys', toys)
    store.dispatch({ type: SET_TOYS, toys })
  })
}

export async function removeToy(toyId) {
  return toyService.remove(toyId).then(() => {
    store.dispatch({ type: REMOVE_TOY, toyId })
  })
}


export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService.save(toy)
      .then(savedToy => {
          store.dispatch({ type, toy: savedToy })
          return savedToy
      })
      .catch(err => {
          console.log('toy action -> Cannot save toy', err)
          throw err
      })
}