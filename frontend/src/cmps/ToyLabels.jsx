import { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { toyService } from '../services/toyService.js'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export function MultipleSelectCheckmarks({ handleChange }) {
  const [personName, setPersonName] = useState([])
  const [combinedArray, setCombinedArray] = useState([])

  useEffect(() => {
    fetchCombinedArray()
  }, [])

  const fetchCombinedArray = async () => {
    try {
      const toys = await toyService.getToys()
      const allLabels = toys.map(toy => toy.labels)
      const combinedLabels = [].concat(...allLabels)
      const transformedArray = combinedLabels
        .map(arrayString => arrayString.slice(1, -1))
        .flatMap(arrayString => arrayString.split(', '))
        .map(element => element.replace(/'/g, ''))
      const uniqueArray = [...new Set(transformedArray)]
      setCombinedArray(uniqueArray)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const handleLabel = event => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
    handleChange(event)
  }

  if (!combinedArray) return <div>Loading...</div>

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleLabel}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {combinedArray.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
