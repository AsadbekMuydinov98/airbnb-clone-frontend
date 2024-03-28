import {  useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "../components";



export default function LoginPage() {

  const dispatch = useDispatch()
  const {isLoading, loggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function login(e) {
    e.preventDefault();
		dispatch(signUserStart())
		const user = {email, password}
		try {
			const response = await AuthService.userLogin(user)
			dispatch(signUserSuccess(response))
			navigate('/')
		} catch (error) {
			dispatch(signUserFailure(error.response.data.message))
		}
  }

  useEffect(() => {
		if (loggedIn) {
			navigate('/')
		}
	}, [loggedIn])

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto"  onSubmit={login}>
        <ValidationError />
          <input type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
          <input type="password"
                placeholder="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
          <button  className="primary">
            {isLoading ? 'loading...' : 'Login'}
          </button>
          <div className="text-center py-2 text-gray-500">
            Do not have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}