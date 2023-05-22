import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/toyActions.js'
import { toyService } from '../services/toyService.js'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService
      .getToyById(toyId)
      .then(setToyToEdit)
      .catch(err => {
        console.log('Had issued in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit).then(savedToy => {
      navigate('/toy')
      showSuccessMsg(`Toy '${savedToy._id}' saved!`)
    })
  }

  const { name, price } = toyToEdit

  return (
    <section className="toy-edit-container">
      <h2>Update Toy</h2>

      <form className="toy-edit-inputs" onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input
          required
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Enter new name"
        />

        <label htmlFor="price">Price:</label>
        <input
          required
          onChange={handleChange}
          value={price}
          type="number"
          name="price"
          id="price"
          placeholder="Enter new price"
        />

        <button> Save </button>
      </form>

      <button onClick={() => navigate('/toy')}> Back </button>
    </section>
  )
}
