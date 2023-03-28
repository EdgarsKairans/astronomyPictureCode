import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./detailPage.scss";
import "../../style/button.scss";

import useNasaServices from "../../services/NasaService";
import Spinner from "../spinner/Spinner";



function DetailPage(props) {
	const [images, setImages] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const [numImages, setNumImages] = useState();

	const { getRandomsDays, getDay } = useNasaServices();

	const { dateInAdress } = useParams();


	useEffect(() => {
		const randomDate = "2008-05-05";

		if (dateInAdress) {
			getDay(dateInAdress).then(changeResponse);
		} else {
			getDay(randomDate).then(changeResponse);
		}
	}, [dateInAdress]);

	const changeResponse = async (answer) => {

		try {
			const data = await answer;

			const newImage = {
				original: data.hdurl,
				thumbnail: data.url,
				originalAlt: data.title,
				mediaType: data.mediaType,
				description: data.date,
				date: data.date,
			};

			setImages([newImage, ...images]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDateChange = async (date) => {
		if (date >= new Date("1995-06-16")) {
			setIsLoading(true);
			try {
				const formattedDate = formatDate(date);
				const data = await getDay(formattedDate);
				const newImage = {
					original: data.hdurl,
					thumbnail: data.url,
					originalAlt: data.title,
					date: data.date,
					mediaType: data.mediaType,
				};
				setImages([newImage, ...images]);
				setSelectedDate(date);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		} else {
			alert("Please choose a date after June 16, 1995.");
		}
	};

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const renderDatePicker = () => (
		<DatePicker
			selected={selectedDate}
			onChange={handleDateChange}
			dateFormat="yyyy-MM-dd"
			isClearable
			placeholderText="Choose a date...yyyy-mm-dd"
			maxDate={new Date()}
			minDate={new Date("1995-06-16")}
			showYearDropdown
		/>
	);

	const handleAddImages = async () => {
		setIsLoading(true);
		try {
			const response = await getRandomsDays(6);
			const newImagesData = response.map(
				({ date, url, hdurl, title, explanation, mediaType }) => ({
					original: hdurl ? hdurl : url,
					thumbnail: url,
					originalAlt: title,
					date: date,
					mediaType: mediaType,
					description: date,
				})
			);
			setImages([...images, ...newImagesData]);
			console.log(images);
			setNumImages(numImages + newImagesData.length);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<div>
			<Link to="/" className="button button__main detailPageBtn">
				<div className="inner"> ← MAIN PAGE</div>
			</Link>
			{isLoading ? (
				<div className="spinner">
					<Spinner />
				</div>
			) : (
				<>
					<div className="imageGallery">
						<ImageGallery
							items={images}
							showPlayButton={false}
							showFullscreenButton={true}
							startIndex={0}
							endIndex={numImages - 1}
							showIndex={true}
							showBullets={true}
							onSlide={4}
							onErrorImageURL={
								"http://tweaklibrary.com/wp-content/uploads/2019/09/Youtube-Not-Working.jpg"
							}
						/>
					</div>

					<div className="gallery__btn" onClick={handleAddImages}>
						<div className="button button__main">
							<div className="inner">Add randoms images</div>
						</div>
					</div>
					<div className="gallery__choise">
						Choise your date: <div>{renderDatePicker()}</div>
					</div>
					<div className="imageGallery__info">
						<div className="image__info-date"></div>
						<div className="image__info-decr"></div>
						<div className="image__info-copyright"></div>
					</div>
				</>
			)}
		</div>
	);
}

export default DetailPage;
