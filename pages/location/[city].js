import React ,{useState} from 'react'
import cities from "../../lib/city.list.json"
import Head from "next/head"
import TodaysWeather from '../../components/TodaysWeather'
import moment from 'moment'
import 'moment-timezone'
import HourlyWeather from '../../components/HourlyWeather'
import WeeklyWeather from '../../components/WeeklyWeather'
import SearchBox from '../../components/SearchBox'


const City = ({ city, hourlyWeather, dailyWeather, timezone }) => 
{
    const [dark, setDark] = useState(false);

    return (
        <div className="city">
            <Head>
                <title>{city.name}&apos;s Forecast</title>
            </Head>
            <div className="page-wrapper">
                <div className={dark ? `container light-bg` : `container`}>
                    <SearchBox back={true} dark={dark} setDark={setDark}/>
                    <TodaysWeather city={city} weather={dailyWeather[0]} timezone={timezone} />
                    <HourlyWeather hourly={hourlyWeather} timezone={timezone}/>
                    <WeeklyWeather weekly={dailyWeather} timezone={timezone} dark={dark}/>
                </div>
            </div>
        </div>
    )
}

export default City


export const getServerSideProps = async (context) => {
    const city = getCity(context.params.city);
    if (!city) {
        return {
            notFound: true,
        }
    }
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`);
    const data = await res.json();
    if (!data) {
        return {
            notFound: true,
        }
    }
    const hourlyWeather = getHourlyData(data.hourly, data.timezone);

    return {
        props: {
            city: city,
            timezone: data.timezone,
            currentWeather: data.current,
            dailyWeather: data.daily,
            hourlyWeather: hourlyWeather,
        }
    }
}

const getCity = (param) => {
    const cityParam = param.trim();
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];
    if (!id) {
        return null
    }
    const city = cities.find(city => city.id.toString() == id);
    if (city) {
        return city
    } else {
        return null
    }
}

const getHourlyData = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf('day').valueOf();
    const endTimeStamp = Math.floor(endOfDay / 1000);
    const todayData = hourlyData.filter((data) => data.dt < endTimeStamp);
    return todayData;
}
