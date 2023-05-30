import { toyService } from '../services/toyService'
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MultipleSelectCheckmarks } from './ToyLabels'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export const ToyFilter = ({ setFilterBy }) => {
  const [filterByToEdit, setFilterByToEdit] = useState(
    toyService.getDefaultFilter()
  )

  useEffect(() => {
    setFilterBy(filterByToEdit)
  }, [filterByToEdit])

  const handleTypeChange = event => {
    const { name, value } = event.target
    setFilterByToEdit(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }))
  }

  function handleSelectChange(selectedOption) {
    const selectedValue = selectedOption ? selectedOption.value : ''
    setFilterByToEdit(prevFilter => {
      return { ...prevFilter, labels: selectedValue ? [selectedValue] : [] }
    })
  }

  return (
    <form className="toy-filter flex justify-center">
      <div>
        <MultipleSelectCheckmarks handleSelectChange={handleSelectChange} />
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="text"
            label="Search Toy"
            variant="outlined"
            name="name"
            value={filterByToEdit.name}
            onChange={handleTypeChange}
          />
        </Box>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Inventory
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filterByToEdit.inStock}
            label="Inventory"
            onChange={handleTypeChange}
            name="inStock"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">In Stock</MenuItem>
            <MenuItem value="false">Out of Stock</MenuItem>
          </Select>
        </FormControl>
      </div>
    </form>
  )
}
