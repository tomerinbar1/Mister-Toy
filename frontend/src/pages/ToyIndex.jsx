import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, removeToy } from '../store/toyActions'
import { ToyList } from '../cmps/ToyList'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy, setSort, setFilter } from '../store/toyActions'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter'
import Button from '@mui/material/Button'
// import {toyService} from '../services/toyService'
import { ToySort } from '../cmps/ToySort'

export const ToyIndex = () => {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  // const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadToys(filterBy, sortBy)
  }, [filterBy, sortBy])

  function setFilterBy(filterBy) {
    setFilter(filterBy)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

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

  return (
    <div>
      <Button className='add-btn' variant="contained">
        <Link to="/toy/edit">Add Toy</Link>
      </Button>
      <ToyFilter
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        onSetSort={onSetSort}
        sortBy={sortBy}
      />
      <ToySort onSetSort={onSetSort} />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
    </div>
  )
}
