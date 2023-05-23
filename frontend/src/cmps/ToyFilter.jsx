import {getLabels} from '../services/toyService.js'

export const ToyFilter = ({ onSetFilter, filterBy }) => {
  const handleChange = ({ target }) => {
    let field = target.name
    let value = target.value

    if (field === 'inStock') {
      if (value === 'all') {
        value = ''
      } else if (value === 'true') {
        value = true
      } else if (value === 'false') {
        value = false
      }
    }
    if (field === 'name') {
      value = target.value
    }
    onSetFilter({ [field]: value })
  }

  return (
    <form className="toy-filter">
      <label htmlFor="by-name">By Name:</label>
      <input
        type="text"
        id="by-name"
        name="name"
        value={filterBy.name}
        onChange={handleChange}
      />
      <label htmlFor="by-in-stock">In Stock:</label>
      <select
        id="by-in-stock"
        name="inStock"
        value={filterBy.inStock}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
    </form>
  )
}
