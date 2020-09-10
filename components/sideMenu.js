import { useRouter } from 'next/router';
import React, { useRef } from 'react';

import ModalX from './modal';
import MovieCreateForm from './movieCreateForm';
import { useCreateMovie } from '../actions/movies';
const SideMenu = (props) => {
	const { categories } = props;
	let modal = useRef(null);

	const router = useRouter();
	const [ createMovie, { data, loading, error } ] = useCreateMovie();
	const handleCreateMovie = (movie) => {
		createMovie(movie).then((movies) => {
			modal.closeModal();
			router.push('/');
		});
	};

	return (
		<div>
			<ModalX ref={(ele) => (modal = ele)} hasSubmit={false}>
				<MovieCreateForm handleFormSubmit={handleCreateMovie} />
				{error && <div className="alert alert-danger mt-2">{error}</div>}
			</ModalX>

			<h1 className="my-4">{props.appName}</h1>
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
