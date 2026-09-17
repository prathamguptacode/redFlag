import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../components/ui/alert-dialog.tsx"
import { UserRoundX } from "lucide-react"
import api from "../api/api.ts"
import { isAxiosError } from "axios"
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"




export default function Form() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [loader, setLoader] = useState(false)
  const [not, setNot] = useState(false)
  const navigate = useNavigate()

  async function handleClick() {
    if (!name) {
      return toast.warning("Please enter the Name ", { position: "top-center" })
    }
    if (!username) {
      return toast.warning("Please enter the Username ", { position: "top-center" })
    }
    try {
      setLoader(true)
      const res = await api.post("/user/add", { name, username })
      setLoader(false)
      navigate("/profile")
    } catch (error) {
      setLoader(false)
      if (isAxiosError(error)) {
        if (error.response?.status == 404) {
          return setNot(true)
        }
        if (error.response?.data?.message == "user already exits") {
          return toast.warning("User already exits", { position: "top-center" })
        }
      }
      return toast.error("Something went wrong", { position: "top-center", duration: 5000 })
    }
  }

  return (
    <div className="max-w-5xl h-screen flex justify-center items-center  mx-auto ">
      <AlertDialogDestructive open={not} setOpen={setNot} />
      <LoaderDialog open={loader} />
      <div className="flex border-3 border-black shadow-[6px_6px_0px_black] w-full  m-2 mx-4 ">
        <div className="flex-1 m-8 flex flex-col gap-6 relative">

          <div className="flex flex-col gap-1">
            <div className='font-bold text-4xl formTitle'>HELLO WORLD</div>
            <div className='text-xl'>Enter your friends details below</div>
          </div>

          <div>
            <div>Full Name</div>
            <Input placeholder="Rockstar Kapoor" value={name} onChange={(e) => setName(e.currentTarget.value)} />
          </div>

          <div>
            <div>Instagram Username </div>
            <Input placeholder="rockstar_kapoor.xk" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          </div>


          <div>
            <div className="text-muted-foreground text-sm hidden md:block">*Thanks for contributing to this site and I hope you are enjoying the experience and by contribution to this small project you are making a new social media to which you are part, at its core. (anonymous)</div>
            <div className="text-muted-foreground text-sm block md:hidden">*Thanks for contributing and I hope you are enjoying the experience.</div>
          </div>

          <div className="flex-1">
            <Button className="w-full" onClick={handleClick}>Submit</Button>
          </div>


        </div>
        <div className="flex-1  hidden md:block">
          <img alt="img" src="penguin.webp" className="w-full h-full object-cover" />
        </div>
      </div>
    </div >
  )
}





function AlertDialogDestructive({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent size="sm" className={"bg-background"}>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive ">
            <UserRoundX />
          </AlertDialogMedia>
          <AlertDialogTitle>Instagram account not found?</AlertDialogTitle>
          <AlertDialogDescription>
            Instagram Username is incorrect, please recheck the username and try again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-muted">
          <AlertDialogCancel size={"sm"} variant="outline" onClick={() => setOpen(false)} >Cancel</AlertDialogCancel>
          <AlertDialogAction variant="default" onClick={() => setOpen(false)}>Retry</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function LoaderDialog({ open }: { open: boolean }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className={"bg-background "}>
        <AlertDialogHeader>
          <AlertDialogTitle className="my-6 mx-auto"><HashLoader color="#ffd12e" size={85} speedMultiplier={1.5} /></AlertDialogTitle>
          <AlertDialogDescription className="my-2 mx-auto">
            Please wait a moment, while we process username.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
