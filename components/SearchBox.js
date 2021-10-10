import { useState } from "react"
import cities from "../lib/city.list.json"
import Link from "next/link"

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


    const search = (e) => {
        const { value } = e.target;
        setQuery(value);
        let matchingCities = [];
        if (value.length > 3) {
            for (let city of cities) {
                if (matchingCities.length >= 5) {
                    break;
                }
                const match = city.name.toLowerCase().startsWith(value.toLowerCase());
                if (match) {
                    const cityData = {
                        ...city,
                        slug: `${city.name.toLowerCase().replace(/ /g,"")}-${city.id}`
                    }
                    matchingCities.push(cityData);
                }
            }
        }
        return setResults(matchingCities);
    };

    return (
        <div className="searchbox">
            <input type="text" autoComplete="off" onChange={search} />
            {query.length>3 && (
                <ul>
                    {results.length > 0 ? 
                        (results.map((result) => 
                        (<li key={result.slug}>
                              <Link href={`/location/${result.slug}`}>
                                <a>
                                    {result.name}
                                    {result.state && `,${result.state}`}
                                    <span>({result.country})</span>
                                </a>
                              </Link>
                          </li>)
                        )) : (<li>no results</li>)
                        }
                </ul>
            )}
        </div>
    )
}

export default SearchBox
