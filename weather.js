/* Regional forecast shared by the desktop map and mobile story.
   One general Cortina coordinate is used: no route or accommodation locations are sent. */
window.TripWeather=(()=>{
  const URL='https://api.open-meteo.com/v1/forecast?latitude=46.5369&longitude=12.1357&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FRome&forecast_days=7';
  const CACHE_KEY='dolomites-regional-weather-v1';
  const CACHE_MS=30*60*1000;

  const describe=code=>{
    if(code===0)return['☀️','Clear'];
    if(code===1)return['🌤️','Mostly clear'];
    if(code===2)return['⛅','Partly cloudy'];
    if(code===3)return['☁️','Overcast'];
    if(code===45||code===48)return['🌫️','Fog'];
    if(code>=51&&code<=57)return['🌦️','Drizzle'];
    if(code>=61&&code<=67)return['🌧️','Rain'];
    if(code>=71&&code<=77)return['🌨️','Snow'];
    if(code>=80&&code<=82)return['🌦️','Showers'];
    if(code===85||code===86)return['🌨️','Snow showers'];
    if(code>=95)return['⛈️','Thunderstorms'];
    return['•','Mixed'];
  };
  const oneDecimal=n=>Math.round((Number(n)||0)*10)/10;
  const normalize=data=>data.daily.time.map((date,i)=>{
    const [icon,label]=describe(data.daily.weather_code[i]);
    return {
      date,icon,label,
      high:Math.round(data.daily.temperature_2m_max[i]),
      low:Math.round(data.daily.temperature_2m_min[i]),
      rain:oneDecimal((data.daily.rain_sum?.[i]||0)+(data.daily.showers_sum?.[i]||0)),
      precip:oneDecimal(data.daily.precipitation_sum?.[i]),
      chance:Math.round(data.daily.precipitation_probability_max?.[i]||0),
      wind:Math.round(data.daily.wind_speed_10m_max?.[i]||0)
    };
  });
  const readCache=()=>{
    try{return JSON.parse(localStorage.getItem(CACHE_KEY)||'null')}catch{return null}
  };
  const writeCache=days=>{
    try{localStorage.setItem(CACHE_KEY,JSON.stringify({saved:Date.now(),days}))}catch{}
  };

  async function load(force=false){
    const cached=readCache();
    if(!force&&cached?.days&&Date.now()-cached.saved<CACHE_MS)return cached.days;
    try{
      const response=await fetch(URL,{cache:'no-store'});
      if(!response.ok)throw new Error(`Forecast returned ${response.status}`);
      const days=normalize(await response.json());
      writeCache(days);
      return days;
    }catch(error){
      if(cached?.days)return cached.days;
      throw error;
    }
  }

  return {load};
})();
