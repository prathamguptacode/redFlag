import Navbar from "../components/Navbar"
import Userbar from "../components/Userbar"

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-4 p-4 ">
        <Userbar />
        <Userbar />
        <Userbar />
        <Userbar />
        <Userbar />
        <Userbar />
      </div>
    </div>
  )
}

export default Home
