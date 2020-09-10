import { useRouter } from 'next/router';
import { useDeleteMovie } from '../../../actions/movies';
import MovieApi from '../../../lib/api/movies';
import Link from 'next/link';

const Movie = ({ movie }) => {
	const router = useRouter();
	const { id } = router.query;
	const [ deleteMovie, { error } ] = useDeleteMovie();

	const handleDeleteMovie = async (id) => {
		await deleteMovie(id).then(() => {
			router.push('/');
		});
	};
	return (
		<div className="container">
			<div className="jumbotron">
				<h1 className="display-4">{movie.name}</h1>
				<p className="lead">{movie.description}</p>
				<hr className="my-4" />
				<p>{movie.genre}</p>
				<button
					onClick={(e) => handleDeleteMovie(movie._id)}
					className="btn btn-danger btn-lg mr-1"
					href="#"
					role="button"
				>
					Delete
				</button>
				<Link href="/movies/[id]/edit" as={`/movies/${id}/edit`}>
					<button className="btn btn-warning btn-lg" href="#" role="button">
						Edit
					</button>
				</Link>
			</div>
			<p className="desc-text">{movie.longDescription}</p>
			{error && <div className="alert alert-danger mt-2">{error}</div>}
			<style>
				{`
                .desc-text{
                    font-size:21px;
                    }
                `}
			</style>
		</div>
	);
};
export async function getStaticPaths() {
	const json = await new MovieApi().getAll();
	const movies = json.data;
	const paths = movies.map((movie) => {
		return {
			params: { id: movie._id }
		};
	});

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	const json = await new MovieApi().getById(params.id);
	const movie = json.data;
	return { props: { movie }, unstable_revalidate: 10 };
}
export default Movie;
