import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getYouTubeID from "get-youtube-id";
import YouTube from "react-youtube";

import Spinner from "../spinner/Spinner";

import useNasaServices from "../../services/NasaService";
import "./fotoDateList.scss";


const CharList = (props) => {
	const [dayList, setDayList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [count, setCount] = useState(6);
	//const [charEnded, setCharEnded] = useState(false);

	const { loading,  getRandomsDays } = useNasaServices();


	useEffect(() => {
		onRequest(count, false);
	}, []);

	const onRequest = (count, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getRandomsDays(count).then(onDaysListLoaded);
	};

	const onDaysListLoaded = (newDaysList) => {
		setDayList((dayList) => [...dayList, ...newDaysList]);
		setNewItemLoading((newItemLoading) => false);
	};



	function renderItems(arr) {
		const items = arr.map((item, i) => {
			const videoOption = {
				height: "150",
				width: "170",
			};
			const fileType =
				item.mediaType === "image" ? (
					<img src={item.url} alt={item.title} />
				) : (
					<YouTube
						videoId={getYouTubeID(item.url)}
						opts={videoOption}
						alt={item.title}
					/>
				);

			return (
				<li
					className="char__item"
					tabIndex={0}
					key={item.date}
					onClick={() => {
						props.onDateSelected(item.date);

					}}
					onKeyPress={(e) => {
						if (e.key === " " || e.key === "Enter") {

						}
					}}
				>
					{/* <img src={item.url} alt={item.title} /> */}
					{fileType}
					<div className="char__name">{item.title}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	const items = renderItems(dayList);


	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="char__list">

			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				onClick={() => onRequest(count)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onDateSelected: PropTypes.func.isRequired,
};

export default CharList;
