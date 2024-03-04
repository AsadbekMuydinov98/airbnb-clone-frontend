import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import AccountNav from '../components/account-nav'
import axios from 'axios'
import PlacesPage from './places-page'

function ProfilePage() {
  const {user, ready, setUser} = useContext(UserContext)
  const [redirect,setRedirect] = useState(null);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  
  async function logout() {
    await axios.post('/user/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
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
