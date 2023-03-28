import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import {Link} from 'react-router-dom';

import useNasaServices from '../../services/NasaService';
import Spinner from '../spinner/Spinner';
import copyrightIcon from '../../resources/img/copyright.png';

import './fotoDateInfo.scss';

const CharInfo = (props) => {

    const [fotoDate, setFotoDate] = useState(null);
    const [checkPropsValue, setCheckPropsValue] = useState()

    const {loading, error, getDay, clearError} = useNasaServices();

    useEffect(() => {

       
        if(props) {

            const {dateSubmit} =  props;
            if(dateSubmit !== checkPropsValue) {
                updateFotoDate();
                setCheckPropsValue(props.dateSubmit);
            }
        }
        

    }, [props]);

    const updateFotoDate = () => {
        const {dateSubmit} =  props;

        clearError();
        getDay(dateSubmit)
            .then(onDayLoaded)
    }

    const onDayLoaded = (fotoDate) => {
        setFotoDate(fotoDate);
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !fotoDate) ? <View fotoDate={fotoDate} /> : null;

    return (
        <div className="char__info">

        {spinner}
        {content}
    </div>
    )
}

const View = ({fotoDate}) => {


    
    const {date, explanation, mediaType, title, copyright, url} = fotoDate;

    const videoOption = {
        height: '150',
        width: '170',
    }


    


    const fileType = (mediaType === "image" ? <img src={url} alt={title} /> : <YouTube  
    videoId = {getYouTubeID(url)} opts={videoOption}  alt={title} />);

    const link = `/detail/${date}`;

    return (
        <div className='images'>
            <div className="char__basics">
                {fileType}
                <div>
                    <div className="char__info-name">{title}</div>
                    <div className="char__btns">
                        <Link to={link} className="button button__main">
                            <div className="inner" 
                            >Full size</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="char__date">
                {date}
            </div>
            <div className="char__descr">
                {explanation}
            </div>
            <div className="char__copyrigth">
                    <img src={copyrightIcon} alt='copyright'/>
                    <div className="char__copyright-name">
                        {copyright}
                    </div>
            </div>
        </div>
    )
}


export default CharInfo;