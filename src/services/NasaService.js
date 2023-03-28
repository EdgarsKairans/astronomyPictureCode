import { useHttp } from "../hooks/http.hooks";

const  useNasaServices = () => { 
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://api.nasa.gov/planetary/apod?";
    const _apiKey = "api_key=bRJJM9g8MH70D5gmo0vYRBNwbghVC8j4Tn0gHeWA";
    //_apiKey = `api_key=DEMO_KEY`;


    // const getResource = async (url) => {
    //     console.log("get info from serice");
    //     let res = await fetch(url);
    //     if(!res.ok) {
    //         throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    //     }
        
    //     return await res.json();
    // }

    const getRandomsDays = async(count) => {
        const res = await request(`${_apiBase}${_apiKey}&count=${count}`);
        return res.map(_transformDay);
    }

    const getRandomDay = async (count) => {
        const res = await request(`${_apiBase}${_apiKey}&count=${count}`);


        return _transformDay(res[0]);
    }

    const getDay = async (date) => {
        
        const res = await request(`${_apiBase}${_apiKey}&date=${date}&concept_tags=True`);
        return _transformDay(res);
    }

    const _transformDay = (day) => {
        return {
            date: day.date,
            title: day.title,
            explanation: day.explanation,
            url: day.url,
            hdurl: day.hdurl,
            mediaType: day.media_type,
            copyright: day.copyright,
            thumbnail_url: day.thumbnail_url
        }
    }

    return {loading, error, clearError, getRandomsDays, getRandomDay, getDay}

}
export default useNasaServices;