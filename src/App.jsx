
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import HomePage from './pages/HomePage';
import AppLayout from './layouts/AppLayout';
import SingleMoviePage from './pages/SingleMoviePage';
import NewMoviePage from './pages/NewMoviePage';
import { NewMovieProvider } from './contexts/NewMovieContext';
import { MoviesProvider } from './contexts/MoviesContext';


function App() {

  return (
    <>
      <BrowserRouter>
        <MoviesProvider>
          <NewMovieProvider>
            <Routes >
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/movies' element={<MoviesPage />} />
                <Route path='/movies/:slug' element={<SingleMoviePage />} />
                <Route path='/new-movie' element={<NewMoviePage />} />
              </Route>
            </Routes>
          </NewMovieProvider>
        </MoviesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
