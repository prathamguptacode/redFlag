import { GhostIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

function Err() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex flex-col gap-4 items-center border-2 border-black p-16 shadow-[6px_6px_0px_black]">
        <GhostIcon size={60} />
        <div className="text-2xl font-bold">Page not found</div>
        <div className="border-2 border-primary w-full"></div>
        <div className="text-center">Something went wrong, please retry later</div>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  )
}

export default Err
