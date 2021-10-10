import Head from "next/head"
import SearchBox from "../components/SearchBox"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App 2.0</title>
      </Head>
      <div className="container">
        <div className="home">
          <SearchBox/>
        </div>
      </div>
    </div>
  )
}
