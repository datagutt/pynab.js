var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');

const YR_API = 'https://yr.no/api/v0/';
const YR_LOCATION_API = `${YR_API}locations/id/`;

const LOC = 'Askim, Norway';

async function getLocation(name = ''){
    return new Promise((resolve, reject) => {
        return fetch(`${YR_API}locations/Search?q=${name}&language=nb`)
        .then(r => r.json())
        .then((data) => {
            if(data && data._embedded){
                resolve(data._embedded.location[0]);
            }else{
                throw new Error('Location not found');
            }
        })
        .catch(reject);
    });
}
async function getWeatherForecast(location = ''){
    return new Promise((resolve, reject) => {
        return fetch(`${YR_LOCATION_API}${location}/forecast`)
        .then(r => r.json())
        .then((data) => {
            if(data && data.shortIntervals){
                const weatherForecastNext = data.shortIntervals[0];
              
                const weatherNow = {
                  start: weatherForecastNext.start,
                  end: weatherForecastNext.end,
                  temp: weatherForecastNext.temperature.value,
                  symbol: weatherForecastNext.symbol,
                  precipitation: weatherForecastNext.precipitation.value,
                };
                resolve(weatherNow);
            }else{
                throw new Error('Forecast not found');
            }
        })
        .catch(reject);
    });
}
/*	
cloudy.mp3
foggy.mp3
rainy.mp3
snowy.mp3
stormy.mp3
sunny.mp3
*/
WEATHER_CLASSES = {
    1: ['sunny', null],
    2: ['sunny', null],
    3: ['cloudy', null],
    4: ['cloudy', null],
    5: ['rainy', null],
    6: ['rainy', null],
    7: ['rainy', null],
    8: ['snowy', null],
    9: ['rainy', null],
    10: ['rainy', null],
    11: ['stormy', null],
    12: ['rainy', null],
    13: ['snowy', null],
    14: ['stormy', null],
    15: ['foggy', null],
    20: ['stormy', null],
    21: ['stormy', null],
    22: ['stormy', null],
    23: ['stormy', null],
    24: ['rainy', null],
    25: ['stormy', null],
    26: ['rainy', null],
    27: ['stormy', null],
    28: ['snowy', null],
    29: ['stormy', null],
    30: ['rainy', null],
    31: ['rainy', null],
    32: ['stormy', null],
    33: ['snowy', null],
    34: ['stormy', null],
    40: ['rainy', null],
    41: ['rainy', null],
    42: ['rainy', null],
    43: ['rainy', null],
    44: ['snowy', null],
    45: ['snowy', null],
    46: ['rainy', null],
    47: ['rainy', null],
    48: ['rainy', null],
    49: ['snowy', null],
    50: ['snowy', null],
};
(async () => {
    let location = await getLocation(LOC);
    console.log(location.name, location.country, location.id );
    let forecast = await getWeatherForecast(location.id);

    await pynab.Mode.setInteractive();
    await pynab.Command.playMultipleAudio([
        `nabweatherd/signature.mp3`,
        `nabweatherd/today.mp3`,
        `nabweatherd/sky/${WEATHER_CLASSES[forecast.symbol.n][0]}.mp3`,
        `nabweatherd/temp/${Math.round(forecast.temp)}.mp3`,
        `nabweatherd/degree.mp3`
    ]);
    await pynab.Mode.setIdle();
    //let state = await pynab.State.getState();
    //console.log(state);
})();
