import { Route, Routes } from 'react-router';
import './App.css';
import { MovieDetails } from './pages/MovieDetails'
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import NotFound from './pages/NotFoutd';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/movie/:id/' element={<MovieDetails/>}/>
          <Route path='/favorites' element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }/>
          <Route path='settings' element={<SettingsPage/>}/>
          <Route path='*' element={<NotFound />}/> 
        </Routes>
      </Layout>
  );
}

export default App;
