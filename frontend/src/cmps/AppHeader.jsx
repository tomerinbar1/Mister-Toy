import { NavLink } from 'react-router-dom'
import { MobileMenu } from './mobileMenu'
import MediaQuery from 'react-responsive'

export const AppHeader = () => {
  return (
    <header className="app-header">
      <nav>
        <MediaQuery minWidth={420}>
          <ul className="clean-list flex justify-center justify-around">
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/toy">Toy</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </MediaQuery>
        <MediaQuery maxWidth={420}>
          <MobileMenu />
        </MediaQuery>
      </nav>
    </header>
  )
}
