import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';


export const ToyPreview = ({ toy, onRemoveToy }) => {
  return (
    <article className="toy-preview">
      <button className='remove-button' onClick={() => onRemoveToy(toy._id)}><CloseIcon/></button>
      <h3>{toy.name}</h3>
      <img src={toy.imgUrl} alt="" />
      <h3>{toy.price}$</h3>
      <div className="preview-buttons">
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
      </div>
    </article>
  )
}
