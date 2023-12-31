const getLoc = async () => {

    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const getWeather = async (lat, lon) => {
   const api_key = '5e31ec89a626dc6b641f87e5d83d1be8';

    const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;


    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function getIcon(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}

function getDayOrNight() {
    let DayOrNigh;
    var d = new Date();

    const hour = d.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }

    return DayOrNigh;
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
let icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');

const tede = document.querySelector('.temperature-description');

window.addEventListener('load', function(){
    getLoc()
        .then(locData => {
           const timeZone = locData.timezone;
            loti.textContent = timeZone
           return getWeather(locData.lat, locData.lon)
                .then(weData => {
                    const weTemp = weData.main.temp;
                    const weMain = weData.weather[0].main;
                    const weDes = weData.weather[0].description;

                    const iconName = getIcon(weMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                    deg.textContent = Math.floor(weTemp);
                    unit.textContent = 'K';
                    dese.addEventListener('click', function(e){
                        if(unit.textContent == 'C'){
                            deg.textContent = getTemp(weTemp).far;
                            unit.textContent = 'K';
                        } 
                        else if(unit.textContent == 'K'){
                            deg.textContent = getTemp(weTemp).can;
                            unit.textContent = 'F';
                        }
                        else{
                            deg.textContent = getTemp(weTemp).kel;
                            unit.textContent = 'C';
                        }
                    })
                    tede.textContent = weDes;
                    console.log(weTemp, weMain, weDes);
                })
        })
})
