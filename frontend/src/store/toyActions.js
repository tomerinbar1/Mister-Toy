import { store } from './store.js'
import {
  SET_TOYS,
  REMOVE_TOY,
  ADD_TOY,
  UPDATE_TOY,
  SET_SORT,
  SET_FILTER,
  SET_IS_LOADING,
} from './toyReducer.js'
import { toyService } from '../services/toyService.js'

export async function loadToys(filterBy, sortBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  try {
    const toys = await toyService.getToys(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('Had issues loading toys', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function removeToy(toyId) {
  return toyService.remove(toyId).then(() => {
    store.dispatch({ type: REMOVE_TOY, toyId })
  })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch(err => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
}

// export function sortToyBy(sortBy) {
//   return toyService.setSortBy(sortBy).then(toys => {
//     store.dispatch({ type: SET_TOYS, toys })
//   })
// }

export function setSort(sortBy) {
  store.dispatch({ type: SET_SORT, sortBy })
}

export function setFilter(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}
