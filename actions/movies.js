import axios from 'axios';
import { useApiHandler, fetcher } from './index';
import useSWR from 'swr';

const CATEGORY_DATA = [
	{ id: 'c-0', name: 'all' },
	{ id: 'c-1', name: 'drama' },
	{ id: 'c-2', name: 'action' },
	{ id: 'c-3', name: 'adventure' },
	{ id: 'c-4', name: 'historical' }
];

export const getCategories = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(CATEGORY_DATA);
			reject('Cannot fetch data!');
		}, 50);
	});
};

const createMovie = (data) => axios.post('/api/v1/movies', data);
const deleteMovie = (id) => axios.delete(`/api/v1/movies/${id}`);
const updateMovie = (id, data) => axios.patch(`/api/v1/movies/${id}`, data);

export const useCreateMovie = () => useApiHandler(createMovie);
export const useDeleteMovie = () => useApiHandler(deleteMovie);
export const useUpdateMovie = () => useApiHandler(updateMovie);
export const useGetMovie = (id) => {
	const { data, error, ...rest } = useSWR(id ? `/api/v1/movies/${id}` : null, fetcher);
	return { data, error, loading: !data && !error, ...rest };
};
