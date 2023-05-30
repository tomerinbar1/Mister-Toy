import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { toyService } from '../services/toyService'

export const ToyDetails = () => {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  const loadToy = () => {
    toyService
      .getToyById(toyId)
      .then(toy => setToy(toy))
      .catch(err => {
        console.log('Had issues to load toy details:', err)
        navigate('/toy')
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <div>
      <h1>ToyDetails</h1>
      <h2>{toy.name}</h2>
      <p>{toy.price}</p>
      <p>{toy.inStock}</p>
      <Link to={'/toy'}>Return</Link>
    </div>
  )
}
