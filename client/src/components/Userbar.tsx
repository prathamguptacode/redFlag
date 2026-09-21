import clsx from "clsx";
import { Flag } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react";
import UserTokenContext from "../context/userToken";
import api from "../api/api";
import { isAxiosError } from "axios";
import { toast } from "sonner";

function Userbar({ _id, name, username, imageUrl, redFlags, greenFlags }: { _id: string, name: string, username: string, imageUrl: string, redFlags: number, greenFlags: number }) {


  const navigate = useNavigate();
  const userTokenData = useContext(UserTokenContext)
  const [activeRed, setActiveRed] = useState(false)
  const [activeGreen, setActiveGreen] = useState(false)
  const [redF, setRedF] = useState(redFlags)
  const [greenF, setGreenF] = useState(greenFlags)



  useEffect(() => {
    if (userTokenData?.userData?.redFlags.includes(username)) {
      setActiveRed(true)
    }
    if (userTokenData?.userData?.greenFlags.includes(username)) {
      setActiveGreen(true)
    }
  }, [userTokenData.userData])




  async function handleRed(event: React.MouseEvent) {
    event.stopPropagation()
    setActiveRed(true)
    userTokenData.setUserData(prev => {
      const redF = [...prev.redFlags, username]
      const data = prev
      data.redFlags = redF
      return data
    })
    try {
      await api.patch(`/user/redflag/${username}`)
      setRedF(prev => prev + 1)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 403) {
          return toast.warning(`Already voted to ${username}`, { position: "top-center", })
        }
      }
      return toast.warning(`Something went wrong`, { position: "top-center" })
    }
  }

  async function handleGreen(event: React.MouseEvent) {
    event.stopPropagation()
    setActiveGreen(true)
    userTokenData.setUserData(prev => {
      const greenF = [...prev.greenFlags, username]
      const data = prev
      data.greenFlags = greenF
      return data
    })
    try {
      await api.patch(`/user/greenflag/${username}`)
      setGreenF(prev => prev + 1)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 403) {
          return toast.warning(`Already voted to ${username}`, { position: "top-center", })
        }
      }
      return toast.warning(`Something went wrong`, { position: "top-center", })
    }
  }




  return (

    <div className="bg-white border-2 shadow-[2px_2px_0px_black] p-6 " tabIndex={0} onClick={() => navigate(`/${username}`, { state: { _id, name, username, imageUrl, redFlags, greenFlags } })}>
      <div className="flex justify-between rounded-sm gap-4 ">
        <div className="shrink-0">
          <img height={"150px"} width={"150px"} src={imageUrl} className="rounded-sm w-[150px] h-[150px]" />
        </div>
        <div className=" flex-1 relative flex flex-col flex-nowrap min-w-0">
          <div className="font-semibold text-2xl whitespace-nowrap text-ellipsis overflow-hidden">{name}</div>
          <div className="text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">{username}</div>
          <div className="text-muted-foreground ellipseCan">Loves cat food and he is too fat</div>
          <div className=" gap-8 mt-auto hidden sm:flex">
            <Button onClick={handleRed} className={clsx("py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive", activeRed && "bg-redFlagColorActive")}><Flag />({redF}) Red Flags </Button>
            <Button onClick={handleGreen} className={clsx("py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive", activeGreen && "bg-greenFlagColorActive")}> <Flag />({greenF}) Green Flags </Button>
          </div>
        </div>
      </div>
      <div className=" gap-4 mt-6 flex flex-col sm:hidden">
        <Button onClick={handleRed} className={clsx(" py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive", activeRed && "bg-redFlagColorActive")}><Flag />({redF}) Red Flags </Button>
        <Button onClick={handleGreen} className={clsx("py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive", activeGreen && "bg-greenFlagColorActive")}> <Flag />({greenF}) Green Flags </Button>
      </div>
    </div >

  )
}

export default Userbar
