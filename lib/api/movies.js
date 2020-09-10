import axios from 'axios';

class MovieApi {
	getAll() {
		return axios.get('http://localhost:3001/api/v1/movies/');
	}
	create(data) {
		return axios.post('http://localhost:3001/api/v1/movies/', data);
	}
	getById(id) {
		return axios.get(`http://localhost:3001/api/v1/movies/${id}`);
	}
	delete(id) {
		return axios.delete(`http://localhost:3001/api/v1/movies/${id}`);
	}
	update(id, data) {
		return axios.patch(`http://localhost:3001/api/v1/movies/${id}`, data);
	}
}

export default MovieApi;
