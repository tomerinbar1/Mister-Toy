import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, removeToy,sortToyBy } from '../store/toyActions'
import { ToyList } from '../cmps/ToyList'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/toyActions'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter'

export const ToyIndex = () => {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const [filterBy, setFilterBy] = useState({ name: '', inStock: 'all', labels: [] })
  const [sortBy, setSortBy] = useState('name') // name, price, createdAt

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  useEffect(() => {
    sortToyBy(sortBy)
  }, [sortBy])

  const onRemoveToy = toyId => {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?', toy.price)
    if (!price || price === toy.price) return

    const toyToSave = { ...toy, price }
    saveToy(toyToSave)
      .then(savedToy => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch(err => {
        showErrorMsg('Cannot update toy')
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
  }

  function onSetSort(sortBy) {
    setSortBy(sortBy)
  }

  return (
    <div>
      <h1>ToyIndex</h1>
      <Link to="/toy/edit">Add Toy</Link>
      <ToyFilter
        onSetFilter={onSetFilter}
        filterBy={filterBy}
        onSetSort={onSetSort}
      />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
    </div>
  )
}
