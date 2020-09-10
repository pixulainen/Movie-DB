import MovieApi from '../../../../lib/api/movies';

export default async function createMovie(req, res) {
	try {
		const json = await new MovieApi().create(req.body);
		return res.json(json.data);
	} catch (e) {
		return res.status(e.status || 422).json(e.response.data);
	}
}
