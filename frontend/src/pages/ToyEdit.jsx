import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/toyActions.js'
import { toyService } from '../services/toyService.js'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={onSaveToy}>
          <label htmlFor="name">Toy Name:</label>
          <TextField
            label="Required"
            id="outlined-required"
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="Enter new Toy name"
          />

          <label htmlFor="price"> Toy Price:</label>
          <TextField
            abel="Number"
            id="outlined-number"
            name="price"
            type="number"
            onChange={handleChange}
            value={price}
            placeholder="Enter toy price"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="edit-btns">
            <Button
              className="back-btn"
              variant="contained"
              onClick={() => navigate('/toy')}
            >
              Back
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      </Box>
    </section>
  )
}
