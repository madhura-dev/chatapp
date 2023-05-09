const key = 'Vo7Mxuh39giH3vL0YvgA5zKzooeUvpM6';


//weather
const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

//get city
const getCity = async (c) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${c}`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data[0];
};



    
