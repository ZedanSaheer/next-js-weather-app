import Head from "next/head"
import FamousPlaces from "../components/FamousPlaces"
import SearchBox from "../components/SearchBox"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App 2.0</title>
      </Head>
      <div className="container">
        <div className="home">
          <h1>Zedan's Weather Application</h1>
          <SearchBox />
          <FamousPlaces />
        </div>
      </div>
    </div>
  )
}
