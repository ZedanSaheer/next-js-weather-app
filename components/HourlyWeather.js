import moment from "moment"
import Image from "next/image"

const HourlyWeather = ({ hourly, timezone}) => {
    return (
        <div className="hourly">
           <div className="hourly__inner">
                {hourly.length > 0 && hourly.map((weather, index) => (<div className="hourly__wrapper" key={weather.dt}>
                    <div className="hourly__wrapper-box">
                        <span className={`hourly__wrapper-box-time${index == 0 ? "-now" : "wrapper"}`}>
                            {index === 0 ? "Now" : moment.unix(weather.dt).tz(timezone).format("LT")}
                        </span>
                        <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={80} height={80} />
                        <span>{weather.temp.toFixed(0)}&deg;C</span>
                    </div>
                </div>
                ))}
           </div>
        </div>
    )
}

export default HourlyWeather
