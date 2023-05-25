import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/toyActions.js'
import { toyService } from '../services/toyService.js'
import { Formik, Field, Form } from 'formik'
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
      <Formik
        initialValues={{
          Name: '',
          Price: 0,
        }}
      >
        <Form onSubmit={onSaveToy}>
          <label htmlFor="name">Toy Name:</label>
          <Field
            id="name"
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="Enter new Toy name"
          />

          <label htmlFor="price"> Toy Price:</label>
          <Field
            id="price"
            name="price"
            onChange={handleChange}
            value={price}
            placeholder="Enter toy price"
          />

          <button type="submit">Save</button>
        </Form>
      </Formik>

      <button onClick={() => navigate('/toy')}> Back </button>
    </section>
  )
}
