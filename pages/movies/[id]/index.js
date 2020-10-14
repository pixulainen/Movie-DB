import { useRouter } from 'next/router';
import { useDeleteMovie } from '../../../actions/movies';
import MovieApi from '../../../lib/api/movies';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Movie = ({ movie }) => {
	const router = useRouter();
	const { id } = router.query;
	const [ deleteMovie, { error } ] = useDeleteMovie();

	const handleDeleteMovie = async (id, name) => {
		if (confirm(`Are you sure you want to delete ${name}`)) {
			toast.success(`${name} has been deleted!`);
			await deleteMovie(id).then((movies) => {
				router.push('/');
			});
		}
	};
	return (
		<div className='container'>
			<div className='jumbotron text-center'>
				<h4 className='card-title h3 pb-2'>
					<h1 className='display-4'>{`${movie.name}  ${movie.releaseYear}`}</h1>
				</h4>
				<div className='view overlay my-4'>
					<img src={movie.cover} className='img-fluid' alt={`${movie.name} image`} />
				</div>
				<p className='card-text'>{movie.description}</p>
				<br />
				<p className='card-text'>{movie.longDesc}</p>
				<hr className='my-4' /> <h5>Movie Genre</h5>
				<p>{movie.genre}</p>
				<button
					onClick={() => handleDeleteMovie(movie._id, movie.name)}
					className='btn btn-danger  mr-1'
					href='#'
					role='button'
				>
					Delete
				</button>
				<Link href='/movies/[id]/edit' as={`/movies/${id}/edit`}>
					<button className='btn  btn-warning' href='#' role='button'>
						Edit
					</button>
				</Link>
			</div>
			{error && <div className='alert alert-danger mt-2'>{error}</div>}
		</div>
	);
};
export async function getStaticPaths() {
	const json = await new MovieApi().getAll();
	const movies = json.data;
	const paths = movies.map((movie) => {
		return {
			params: {
				id: movie._id,
			},
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
