import MovieApi from '../../../../lib/api/movies';

export default async function handleMovie(req, res) {
	if (req.method === 'GET') {
		try {
			const json = await new MovieApi().getById(req.query.id);
			return res.json(json.data);
		} catch (e) {
			return res.status(e.status || 422).json(e.response.data);
		}
	}
	if (req.method === 'PATCH') {
		try {
			const json = await new MovieApi().update(req.query.id, req.body);
			return res.json(json.data);
		} catch (e) {
			return res.status(e.status || 422).json(e.response.data);
		}
	}
	if (req.method === 'DELETE') {
		try {
			const json = await new MovieApi().delete(req.query.id);
			return res.json(json.data);
		} catch (e) {
			return res.status(e.status || 422).json(e.response.data);
		}
	}
}
