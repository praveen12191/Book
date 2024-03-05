import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import PdfViewer from './components/PdfViewer';
import Login from './components/auth/login'
import { Outlet } from 'react-router-dom';
import Home from './Home';
import Progress from './components/progress';
import ProgressCart from './components/progressCart';

const App = () => {
	return (
		<>
	
			{/*<PdfViewer></PdfViewer>*/}
			{/*<Outlet/>*/}
			<ProgressCart />
		</>
		
	);
};

export default App;