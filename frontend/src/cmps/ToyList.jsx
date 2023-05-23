import { ToyPreview } from './ToyPreview'

export const ToyList = ({ toys, onRemoveToy }) => {
  return (
    <div>
      <ul className='toy-list clean-list'>
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
