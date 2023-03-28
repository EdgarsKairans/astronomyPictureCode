import {useState } from "react";

import CharList from "../fotoDateList/FotoDateList";
import CharInfo from "../fotoDateInfo/FotoDateInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";




const MainPage = (props) => {
	const [selectedDate, setDate] = useState("2018-11-11");
	

	const randomDate = (start, end) => {
		let randomDate = "YYYY-MM-DD";
		return (randomDate = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		));
	};


	const onDateSelected = (date) => {
		setDate(date);
	};

	return (
		<>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onDateSelected={onDateSelected} />
				</ErrorBoundary>
				<CharInfo dateSubmit={selectedDate}/>
				{/* <CharInfo dateSubmit={selectedDate} onSelectedFullSize={onSelectedFullSize}/> */}
			</div>
			{/* <img className="bg-decoration" src={astronaut} alt="astronaut"/> */}
		</>
	);
};

export default MainPage;
