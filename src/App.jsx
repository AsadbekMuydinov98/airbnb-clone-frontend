import './App.css'
import {Routes, Route} from 'react-router-dom'
import {IndexPage, LoginPage, RegisterPage, ProfilePage, PlacesPage,  PlacesFormPage, PlacePage, BookingsPage, BookingPage, PlaceEditPage } from './pages'
import Layout from './components/layout'
import { signUserSuccess } from './slice/auth'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getItem } from './helpers/persistance-storage'


function App() {
  const dispatch = useDispatch()

	const getUser = async () => {
		try {
			const response = await AuthService.getUser()
			dispatch(signUserSuccess(response))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const token = getItem('token')
		if (token) {
			getUser()
		}
	}, [])

  return (
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
  )
}

export default App
