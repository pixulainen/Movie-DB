import React from 'react';
import Router from 'next/router';
import MovieCreateForm from '../../../components/movieCreateForm';
import { useGetMovie, useUpdateMovie } from '../../../actions/movies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditMovie = () => {
	const router = useRouter();
	const { data: initialData, error, loading } = useGetMovie(router.query.id);
	const [ updateMovie, { error: updateError } ] = useUpdateMovie();

	const handleUpdateMovie = async (movie) => {
		await updateMovie(router.query.id, movie);
		toast.success('Movie has been updated!', { autoClose: 2000 });
		Router.push('/movies/[id]', `/movies/${movie._id}`);
	};
	return (
		<div className='container'>
			<h1>Edit Movie</h1>
			{initialData && (
				<MovieCreateForm initialData={initialData} handleFormSubmit={handleUpdateMovie} submitButton='Update' />
			)}
			{updateError && <div className='alert alert-danger mt-2'>{updateError}</div>}
		</div>
	);
};

export default EditMovie;
