import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MultipleSelectCheckmarks } from './ToyLabels'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export const ToyFilter = ({ onSetFilter, filterBy, onSetSort,sortBy }) => {

  const handleChange = ({ target }) => {
    let field = target.name
    let value = target.value

    if (field === 'inStock') {
      if (value === 'all') {
        value = 'all'
      } else if (value === 'true') {
        value = true
      } else if (value === 'false') {
        value = false
      }
    }

    if (field === undefined) {
      field = 'labels'
      value = target.value
    }

    onSetFilter({ [field]:  value})
  }

  const handleSort = ({ target }) => {
    onSetSort(target.value)
  }
  return (
    <form className="toy-filter flex justify-center">
      <MultipleSelectCheckmarks handleChange={handleChange} />
      <div>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Search Toy"
            variant="outlined"
            value={filterBy.name}
            name="name"
            onChange={handleChange}
          />
        </Box>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Inventory
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filterBy.inStock}
            label="Inventory"
            onChange={handleChange}
            name="inStock"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">In Stock</MenuItem>
            <MenuItem value="false">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={sortBy}
            onChange={handleSort}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="createdAt">Date</MenuItem>
          </Select>
        </FormControl>
      </div>
    </form>
  )
}
