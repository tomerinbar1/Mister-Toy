import './assets/style/setup/main.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex'
import { AppHeader } from './cmps/AppHeader'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

export default App
