import { Link } from 'react-router-dom'

export const ToyPreview = ({ toy }) => {
  return (
    <article className="toy-preview">
      <h3>{toy.name}</h3>
        {/* <img src={toy.imgUrl} alt="" /> */}
      <Link to={`/toy/${toy._id}`}>Details</Link>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link>

    </article>
  )
}
