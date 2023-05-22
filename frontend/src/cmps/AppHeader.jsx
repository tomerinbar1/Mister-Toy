import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <header className="app-header">
      <nav>
        <ul className="clean-list flex justify-center justify-around">
          <li>
            <NavLink to="/"> Home </NavLink>
          </li>
          <li>
            <NavLink to="/toy">Toy</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
