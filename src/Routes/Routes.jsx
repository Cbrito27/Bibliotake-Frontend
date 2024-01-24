import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/Layout';
const MyRoutes = () => {
	return(
		<BrowserRouter>
			<Routes>

				
				<Route path='/' element={ <Layout/> }>

				</Route>
			</Routes>
		</BrowserRouter>
	);
};


export { MyRoutes };