const api_key="94e57e8d24b8392ae0be0167b72ee457"


const weatherDataEl=document.getElementById("weather-data");
const cityInputEl=document.getElementById("city-input");


const formEl=document.querySelector("form");


formEl.addEventListener("submit",(e)=>{
    e.preventDefault();

    const cityValue=cityInputEl.value;

    getWeatherData(cityValue)




})



async function getWeatherData(cityValue){
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api_key}&units=metric`)

        if(!response.ok){
            throw new Error('Network response was not ok')
        }

        const data=await response.json()
        
        const temperature=Math.round(data.main.temp)
        const description=data.weather[0].description
        const icon=data.weather[0].icon

        const details = [
            
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
            
            ];

            weatherDataEl.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`;
            weatherDataEl.querySelector(
              ".temperature"
            ).innerHTML = ` <div class="temperature">${temperature}</div>`;
            weatherDataEl.querySelector(
              ".description"
            ).textContent = description;
            
            weatherDataEl.querySelector(
              ".details"
            ).innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
            
    
    
        } catch(e){
            weatherDataEl.querySelector(
              ".icon"
            ).innerHTML ='';
            weatherDataEl.querySelector(
              ".temperature"
            ).innerHTML = '';
            weatherDataEl.querySelector(".description").textContent =
              'Error happened, check the name of the city again or try again later';

            weatherDataEl.querySelector(".details").innerHTML ='';
            
    
            
        }
}
    


   