import axios from 'axios';

export default async (req, resp) => {
	if (req.method === 'POST') {
		const postData = JSON.parse(req.body);
		console.log(postData);
		return resp.json({
			status: 'Saving Post',
			...postData
		});
	} else {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
		posts = response.data;
		return resp.json(posts.slice(0, 20));
	}
};
