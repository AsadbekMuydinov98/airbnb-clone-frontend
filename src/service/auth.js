import axios from './api'

const AuthService = {
	async userRegister(user) {
		const {data} = await axios.post('/user/register', user)
		return data
	},
	async userLogin(user) {
		const {data} = await axios.post('/user/login', user)
		return data
	},
	async getUser() {
		const {data} = await axios.get('/user/profile')
		return data
	},
}

export default AuthService
