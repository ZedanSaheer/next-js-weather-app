import { useState } from "react"
import cities from "../lib/city.list.json"
import Link from "next/link"

const SearchBox = ({ back , dark , setDark }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [x, showX] = useState(false);

    const search = (e) => {
        const { value } = e.target;
        showX(true);
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
                        slug: `${city.name.toLowerCase().replace(/ /g, "")}-${city.id}`
                    }
                    matchingCities.push(cityData);
                }
            }
        }
        return setResults(matchingCities);
    };

    const clearInput = () => {
        showX(false);
        document.getElementById("input").value = "";
        setQuery("");
    }
    const clearList = () => {
        showX(false);
        document.getElementById("input").value = "";
        setQuery("");
    }

    return (
        <div className="searchbox">
            <div className="searchbox__back">
                {back && <Link href="/">
                    <div className={dark && `light-text`}>
                        &#8592;
                        <span>Go back to home</span>
                    </div>
                </Link>}
                {back && <div className={dark ? `toggle active` : `toggle`} onClick={() => setDark(value => !value)}>
                    <div className={dark ? `switch active` : `switch`}>{dark ? "🌙" : "🌕"}</div>
                </div>}
            </div>
            <div className="searchbox__wrapper">
                <div className="searchbox__input">
                    <input type="text" autoComplete="off" onChange={search} placeholder="Search a location.." onClick={() => showX(true)} id="input" />
                    {x && <span onClick={clearInput}>&#10006;</span>}
                </div>
                {query.length > 3 && (
                    <ul>
                        {results.length > 0 ?
                            (results.map((result) =>
                            (<Link href={`/location/${result.slug}`}>
                                <li key={result.slug} onClick={clearList}>
                                    <a>
                                        {result.name}
                                        {result.state && `,${result.state}`}
                                        <span>({result.country})</span>
                                    </a>
                                </li>
                            </Link>)
                            )) : (<li>no results</li>)
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SearchBox
