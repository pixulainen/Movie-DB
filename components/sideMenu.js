import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Modal from './modal';
import MovieCreateForm from './movieCreateForm';
import { useCreateMovie } from '../actions/movies';
import { toast } from 'react-toastify';
const SideMenu = (props) => {
	toast.configure();
	const { categories } = props;
	const router = useRouter();
	const [ createMovie, { data, loading, error } ] = useCreateMovie();
	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	const handleCreateMovie = (movie) => {
		createMovie(movie).then((movies) => {
			setModal(!modal);
			toast.success(` ${movie.name} has been created`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
			router.push('/');
		});
	};

	return (
		<div>
			<Modal toggle={toggle} modal={modal} buttonLabel="Create Movie" hasSubmit={false}>
				<MovieCreateForm handleFormSubmit={handleCreateMovie} />
				{error && <div className="alert alert-danger mt-2">{error}</div>}
			</Modal>

			<h2 className="my-3">{props.appName}</h2>
			<div className="list-group">
				{categories.map((category) => (
					<a
						onClick={() => props.changeCategory(category)}
						key={category.id}
						href="#"
						className={`list-group-item  ${props.activeCategory === category.name ? 'active' : ''}`}
					>
						{category.name}
					</a>
				))}
			</div>
		</div>
	);
};
export default SideMenu;
