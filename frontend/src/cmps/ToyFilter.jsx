import { MultipleSelectCheckmarks } from './ToyLabels'

export const ToyFilter = ({ onSetFilter, filterBy, onSetSort }) => {
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

    if (field === undefined) {
      field = 'labels'
      value = target.value
    }

    onSetFilter({ [field]: value })
  }

  const handleSort = ({ target }) => {
    onSetSort(target.value)
  }

  return (
    <form className="toy-filter flex justify-center">
      <MultipleSelectCheckmarks handleChange={handleChange} />
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
      <label htmlFor="sort-by">Sort By:</label>
      <select
        id="sort-by"
        name="sortBy"
        value={filterBy.sortBy}
        onChange={handleSort}
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Date</option>
      </select>
    </form>
  )
}
