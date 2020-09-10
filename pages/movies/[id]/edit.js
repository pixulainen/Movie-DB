import React from 'react';
import Router from 'next/router';
import MovieCreateForm from '../../../components/movieCreateForm';
import { useGetMovie, useUpdateMovie } from '../../../actions/movies';
import { useRouter } from 'next/router';

const EditMovie = () => {
	const router = useRouter();
	const { data: initialData, error, loading } = useGetMovie(router.query.id);
	const [ updateMovie, { error: updateError } ] = useUpdateMovie();

	const handleUpdateMovie = async (movie) => {
		await updateMovie(router.query.id, movie);
		Router.push('/movies/[id]', `/movies/${movie._id}`);
	};
	return (
		<div className="container">
			<h1>Edit Movie</h1>
			{initialData && (
				<MovieCreateForm initialData={initialData} handleFormSubmit={handleUpdateMovie} submitButton="Update" />
			)}
		</div>
	);
};

export default EditMovie;
