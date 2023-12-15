import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import checkAuth from './features/users/utils/checkAuth';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';

function App () {
	const router = createBrowserRouter([
		                                   checkAuth() ? privateRoutes() : {},
		                                   ...publicRoutes(),
	                                   ]);
	return <RouterProvider router={router}/>;
}

export default App;
