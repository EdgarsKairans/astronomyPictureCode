import { useState, useEffect } from 'react';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import {Link, useParams} from 'react-router-dom';


import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMassage';
import useNasaServices from '../../services/NasaService';

import galaxy from '../../resources/img/galaxy.png'
import './randomChar.scss';



const RandomChar = (props) => {

    const [day, setDay] = useState(null);
    const {loading, error, getRandomDay, clearError} = useNasaServices();
    


    const {dateInAdress} = useParams();

    useEffect(() => {
        updateDay();
    }, [])

    
    const fullSize = (date) => {
        props.onSelectFullSize(date);
    }

    const onSetDay = (day ) => {
        setDay(day);

        fullSize(day);
    }




    const updateDay = () => {
        clearError();
        const id = 1;
        getRandomDay(id)
            .then(onSetDay);
    }


    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !day) ? <View day={day}   onSelectFullSize={props.onSelectFullSize}/> : null;


  

    return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random Astronomy Picture of the Day!
						<br />
						Do you want to know it better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button onClick={updateDay} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={galaxy} alt="galaxy" className="randomchar__decoration" />
				</div>
			</div>
		);
}


const View = ({day, onSelectFullSize}, props) => {
    const {date, title, url, mediaType} = day;

    const videoOption = {
        height: '150',
        width: '170',
    }


    const fileType = (mediaType === "image" ? <img className='randomchar__img' src={url} alt={title} /> : <YouTube  
    videoId = {getYouTubeID(url)} opts={videoOption}  alt={title} />);

    const link = `/detail/${date}`;
    return ( 
        <div className="randomchar__block">
            {fileType}
            <div className="randomchar__info">
                <p className="randomchar__name">{title}</p>
                <p className="randomchar__descr">
                    {date}
                </p>
                <div className="randomchar__btns">
                    <Link to={link} className="button button__main">
                        <div className="inner" >FULL SIZE</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;



