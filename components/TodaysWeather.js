import moment from "moment-timezone"
import Image from "next/image"

const TodaysWeather = ({ city, weather,timezone }) => {
    return (
        <div className="today">
            <div className="today__inner">
                <div className="today__inner-left-content">
                    <h1>
                        {city.name}({city.country})
                    </h1>
                    <h2>
                        <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                        <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                    </h2>
                    <div className="today__inner-left-content-sun-times">
                        <div>
                            <span>Sunrise</span>
                            <span>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
                        </div>
                        <div>
                            <span>Sunset</span>
                            <span>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
                        </div>
                    </div>
                </div>
                <div className="today__inner-right-content">
                    <div className="today__inner-right-content-icon-wrapper">
                            <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" width={40} height={40}/>
                        <h3>
                            {weather.weather[0].description}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysWeather
