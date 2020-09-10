import React, { useState } from 'react';
import SideMenu from '../components/sideMenu';
import Carousel from '../components/carousel';
import MovieList from '../components/movieList';

import { getCategories } from '../actions/movies';
import MovieApi from '../lib/api/movies';

const Home = ({ movies, categories, images }) => {
	const [ filter, setFilter ] = useState('all');

	const changeCategory = (category) => {
		setFilter(category.name);
	};
	const filterMovies = (movies) => {
		if (filter === 'all') {
			return movies;
		}
		return movies.filter((movie) => {
			return movie.genre && movie.genre.includes(filter);
		});
	};
	return (
		<div>
			<div className="home-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							{
								<SideMenu
									activeCategory={filter}
									changeCategory={changeCategory}
									categories={categories}
									appName={'Movie DB'}
								/>
							}
						</div>
						<div className="col-lg-9">
							<Carousel images={images} />
							<h3>Displaying {filter} movies</h3>
							<div className="row">
								<MovieList movies={filterMovies(movies) || []} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const json = await new MovieApi().getAll();
	const movies = json.data;
	const categories = await getCategories();
	const images = movies.map((movie) => ({
		id: `image + ${movie._id}`,
		url: movie.cover,
		name: movie.name
	}));
	return {
		props: {
			movies,
			images,
			categories
		},
		unstable_revalidate: 100
	};
}

export default Home;
