import Image from "next/image"
import Link from "next/link"
import jeddah from "../public/jeddah.jpg"
import riyadh from "../public/riyadh.jpg"
import dammam from "../public/dammam.jpg"
import khobar from "../public/khobar.png"

const places = [
    {
        name : "riyadh",
        image : riyadh,
        url: "/location/riyadh-108410"
    },
    {
        name: "dammam ❤️",
        image : dammam,
        url: "/location/dammam-110336"
    },
    {
        name : "jeddah",
        image : jeddah,
        url: "/location/jeddah-105343"
    },
    {
        name : "khobar",
        image : khobar,
        url: "/location/khobar-109323"
    },
]

const FamousPlaces = ({dark}) => {
    return (
        <div className="famous">
            <div className="place">
                <div className="place__row">
                    {places?.length > 1 && places.map((place,index)=>(
                        <div className="place__box" key={index}>
                            <Link href={place.url}>
                               <div className="place__image-wrapper">
                                   <Image src={place.image} alt={place.name} width="300" height="160" objectFit="cover"/>
                                    <span className={dark && `light-text` }>{place.name}</span>
                               </div> 
                            </Link>                 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FamousPlaces
