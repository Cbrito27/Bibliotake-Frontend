import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Layout } from '../pages/Layout';
const MyRoutes = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="login" element={ <Login /> } />
				
				<Route path='/' element={ <Layout/> }>

				</Route>
			</Routes>
		</BrowserRouter>
	);
};


export { MyRoutes };