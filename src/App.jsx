
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import HomePage from './pages/HomePage';
import AppLayout from './layouts/AppLayout';
import SingleMoviePage from './pages/SingleMoviePage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route element={<AppLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/movies' element={<MoviesPage/>}/>
            <Route path='/movies/:slug' element={<SingleMoviePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
