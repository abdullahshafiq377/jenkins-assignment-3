import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import UsersPage from '../pages/UsersPage';
import AddUserPage from '../pages/AddUserPage';
import EditUserPage from '../pages/EditUserPage';
import MessagesPage from '../pages/MessagesPage';
import NotFoundPage from '../pages/NotFoundPage';
import TemplatesPage from '../pages/TemplatesPage';
import AddTemplatePage from '../pages/AddTemplatePage';
import MessageResponsePage from '../pages/MessageResponsePage';
import Settings from '../pages/Settings';
import ErrorPage from '../pages/ErrorPage';

const privateRoutes = () => {
	return {
		element: <Layout/>,
		errorElement: <NotFoundPage/>,
		children: [
			{path: 'dashboard', errorElement: <ErrorPage/>, element: <Dashboard/>},
			{path: 'users', errorElement: <ErrorPage/>, element: <UsersPage/>},
			{path: 'users/add', errorElement: <ErrorPage/>, element: <AddUserPage/>},
			{path: 'users/edit/:userId', errorElement: <ErrorPage/>, element: <EditUserPage/>},
			{path: 'messages', errorElement: <ErrorPage/>, element: <MessagesPage/>},
			{path: 'templates', errorElement: <ErrorPage/>, element: <TemplatesPage/>},
			{path: 'templates/add', errorElement: <ErrorPage/>, element: <AddTemplatePage/>},
			{path: 'messageResponse', errorElement: <ErrorPage/>, element: <MessageResponsePage/>},
			{path: 'settings', errorElement: <ErrorPage/>, element: <Settings/>},
		]
	};
};
export default privateRoutes;
