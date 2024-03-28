import { useNavigate, useParams } from 'react-router-dom'
import AccountNav from '../components/account-nav'
import PlacesPage from './places-page'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../slice/auth'
import { removeItem } from '../helpers/persistance-storage'

function ProfilePage() {
  const navigate = useNavigate()
	const dispatch = useDispatch()
  const { user} = useSelector(state => state.auth)
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  
  const logout = () => {
		dispatch(logoutUser())
		removeItem('token')
		navigate('/')
	}


  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}

export default ProfilePage
