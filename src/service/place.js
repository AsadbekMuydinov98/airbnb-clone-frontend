import axios from './api'

const PlaceService = {
	async getAllPlaces() {
		const {data} = await axios.get('/places')
		return data
	},
	async getPlaceDetail(id) {
		const {data} = await axios.get(`/places/${id}`)
		return data
	},
}

export default PlaceService
