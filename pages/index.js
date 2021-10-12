import Head from "next/head"
import { useState } from "react"
import FamousPlaces from "../components/FamousPlaces"
import SearchBox from "../components/SearchBox"

export default function Home() {
  const [dark ,setDark] = useState(false);
  return (
    <div>
      <Head>
        <title>Weather App 2.0</title>
      </Head>
      <div className={dark ? `container light-bg` : `container`}>
        <div className="home">
          <div className="title">
            <h1 className={dark && `light-text`}>Zedan&apos;s Weather Application</h1>
            <div className={dark ? `toggle active` : `toggle`} onClick={() => setDark(value => !value)}>
              <div className={dark ? `switch active` : `switch`}>{dark ? "🌙" : "🌕"}</div>
            </div>
          </div>
          <SearchBox />
          <FamousPlaces dark={dark}/>
        </div>
      </div>
    </div>
  )
}
