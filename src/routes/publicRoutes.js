import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ErrorPage from '../pages/ErrorPage';

const publicRoutes = () => {
	return [
		{path: '/', errorElement: <ErrorPage/>, element: <LoginPage/>},
		{path: '*', errorElement: <ErrorPage/>, element: <NotFoundPage/>},
	];
};

export default publicRoutes;
