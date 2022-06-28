const cityForm = document.querySelector('form');
const card = document.querySelector('.weather-card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    //updating the index template
    details.innerHTML = `
    <h5 class="city-name">${cityDets.EnglishName}</h5>
    <div class="we-condi">${weather.WeatherText}</div>
    <div class="we-temp">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update img and icons

    const iconSrc = `img/${weather.WeatherIcon}.svg`;
    
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', iconSrc);

    // remove display class
    if(card.classList.contains('hide')){
        card.classList.remove('hide');
    }
};


// city info from api
const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
        weather
    };

};
// city details
cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city name
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // get ui update with city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});