import React, { useState} from "react";
import {
	//BrowserRouter as Router,
	Route,
	Routes,
	
} from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import { MainPage, DetailPage, Page404 } from "../pages";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import astronaut from "../../resources/img/astronaut.png";

// const MainPage = lazy(() => import('../pages/MainPage'));
// const Page404 = lazy(() => import('../pages/404'));
//const DetailPage = lazy(() => import('../pages/DetailPage'));
// import DetailPage from "../pages/DetailPage"

const App = (props) => {

	const [selectFullSize, setSelectFullSize] = useState("1998-01-13");

	const onSelectFullSize = (date) => {
		setSelectFullSize(date);
	};

	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<ErrorBoundary>
						<RandomChar onSelectFullSize={onSelectFullSize} />
					</ErrorBoundary>
					
						<Routes>
							<Route path="/" element={<MainPage />} />

							<Route
								path="/detail"
								element={<DetailPage selectFullSize={selectFullSize} />}
							/>
							<Route
								path="/detail/:dateInAdress"
								element={<DetailPage selectFullSize={selectFullSize} />}
							/>

							<Route path="*" element={<Page404 />} />
						</Routes>
					
				</main>
				<img className="bg-decoration" src={astronaut} alt="astronaut" />
			</div>
		</Router>
	);
};

export default App;
