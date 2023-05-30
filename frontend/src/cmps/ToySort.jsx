import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export function ToySort({ onSetSort }) {
  const [currSort, setCurrSort] = useState(toyService.getDefaultSort())

  useEffect(() => {
    onSetSort(currSort)
  }, [currSort])

  function setSort(newSort) {
    const change = newSort === currSort.value ? -currSort.change : 1
    const sortBy = {
      value: newSort,
      change,
    }
    setCurrSort(sortBy)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        onChange={ev => setSort(ev.target.value)}
        value={currSort.value}
        label="Sort By"
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="createdAt">Date</MenuItem>
      </Select>
    </FormControl>
    
  )
}
