import { ToyPreview } from './ToyPreview'

export const ToyList = ({ toys, onRemoveToy, onEditToy }) => {
  return (
    <div>
      <ul className='toy-list clean-list'>
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} />
            <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
