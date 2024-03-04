import './App.css'
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import IndexPage from './pages/index-page'
import LoginPage from './pages/login-page'
import Layout from './components/layout'
import RegisterPage from './pages/register-page'
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/profile-page';
import PlacesPage from './pages/places-page';
import PlacesFormPage from './pages/places-form-page';
import PlacePage from './pages/place-page';
import BookingsPage from './pages/bookings-page';
import BookingPage from './pages/booking-page';
import PlaceEditPage from './pages/place-edit-page';

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://airbnb-clone-backend-mwww.onrender.com/';
axios.defaults.withCredentials = true;


function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/place-edit/:id" element={<PlaceEditPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
