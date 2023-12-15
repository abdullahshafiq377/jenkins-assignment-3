import React from 'react';
import SideNav from './SideNav';
import { Outlet } from 'react-router';

const Layout = () => {
	return (
		<SideNav>
			<Outlet/>
		</SideNav>
	);
};

export default Layout;
