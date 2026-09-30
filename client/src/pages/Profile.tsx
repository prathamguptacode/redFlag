import { Flag, } from "lucide-react"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { BarLoader, } from "react-spinners";
import clsx from "clsx";
import UserTokenContext from "../context/userToken";
import { LikeButton } from "../components/ui/Like";

type UserT = {
  _id: string,
  username: string,
  name: string,
  redFlags: number,
  greenFlags: number,
  imageUrl: string
}

type ResT = { user: UserT }

type CommentsT = {
  content: string,
  likes: number,
  _id: string,
}

type ResCommentT = {
  comments: CommentsT[]
}


function Profile() {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const navigate = useNavigate()

  const { username } = useParams()
  const [profileLoader, setProfileLoader] = useState(true)
  const [profile, setProfile] = useState<UserT | null>(null)
  const [commentLoader, setCommentLoader] = useState(true)
  const [comments, setComments] = useState<CommentsT[] | null>(null)

  // const [redFlags, setRedFlags] = useState(0)
  // const [greenFlags, setGreenFlags] = useState(0)




  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<ResT>(`/user/${username}`)
        setProfile(res.data.user)
        // setRedFlags(res.data.user.redFlags)
        // setGreenFlags(res.data.user.greenFlags)
        setProfileLoader(false)
        const commentsRes = await api.get<ResCommentT>(`/comments/${res.data.user._id}`)
        setComments(commentsRes.data.comments)
        setCommentLoader(false)
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status == 404) {
            return navigate(`/error/error?message=User Profile not found`)
          }
        }
        // return navigate(`error?message=Somethong went wrong`)
        return toast.warning("Something went wrong", { position: "top-center" })
      }
    })()
  }, [username])




  const [activeRed, setActiveRed] = useState(false)
  const [activeGreen, setActiveGreen] = useState(false)


  async function handleRed() {
    setActiveRed(true)
    setProfile(prev => {
      if (prev) {
        const redF = prev.redFlags + 1
        const data = prev
        data.redFlags = redF
        return data
      }
      return null
    })
    userTokenData?.setUserData(prev => {
      if (username) {
        const redF = [...prev.redFlags, username]
        const data = prev
        data.redFlags = redF
        return data
      }
      return prev
    })
    try {
      await api.patch(`/user/redflag/${username}`)
      // setRedFlags(prev => prev + 1)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 403) {
          return toast.warning(`Already voted to ${username}`, { position: "top-center", })
        }
      }
      return toast.warning(`Something went wrong`, { position: "top-center" })
    }
  }

  async function handleGreen() {
    setActiveGreen(true)
    setProfile(prev => {
      if (prev) {
        const greenF = prev.greenFlags + 1
        const data = prev
        data.greenFlags = greenF
        return data
      }
      return null
    })
    userTokenData?.setUserData(prev => {
      if (username) {
        const greenF = [...prev.greenFlags, username]
        const data = prev
        data.greenFlags = greenF
        return data
      }
      return prev
    })
    try {
      await api.patch(`/user/greenflag/${username}`)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 403) {
          return toast.warning(`Already voted to ${username}`, { position: "top-center", })
        }
      }
      return toast.warning(`Something went wrong`, { position: "top-center" })
    }
  }

  const userTokenData = useContext(UserTokenContext)

  useEffect(() => {
    if (userTokenData?.userData && username) {
      if (userTokenData?.userData?.redFlags.includes(username)) {
        setActiveRed(true)
      }
      if (userTokenData?.userData?.greenFlags.includes(username)) {
        setActiveGreen(true)
      }
    }
  }, [userTokenData?.userData, username])





  const [inComment, setInComment] = useState("")
  async function addComment() {
    if (inComment == "") {
      return toast.warning("Observation cannot be empty", { position: "top-center" })
    }
    setComments(e => {
      if (e) {
        return [...e, { likes: 0, content: inComment, _id: "0" }]
      }
      return [{ likes: 0, content: inComment, _id: "0" }]
    })
    if (profile) {
      try {
        await api.post(`/comments/${profile._id}`, { content: inComment })
      } catch {
        return toast.warning("Something went wrong", { position: "top-center" })
      }
    }
  }





  return (
    <div >
      <Navbar />
      <div className="px-2 md:px-4">
        <div className="shadow-[4px_4px_0px_black] relative border-3 border-black md:shadow-[6px_6px_0px_black]  max-w-2xl mx-auto my-6  p-6 flex flex-col gap-4 ">

          <div className="absolute top-0 left-0 w-full h-full bg-background justify-center items-center" style={{ display: profileLoader ? "flex" : "none" }}>
            <BarLoader color="#ffd12e" speedMultiplier={1.8} />
          </div>

          <img height={"250px"} width={"250px"} src={profile?.imageUrl} className="rounded-sm object-cover mx-auto h-[250px] w-[250px]" />

          <div>
            <div className="font-semibold text-2xl text-center">{profile?.name}</div>
            <div className="text-muted-foreground text-center">{profile?.username}</div>
          </div>

          <div className=" self-center flex gap-12">
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="text-lg font-semibold">{profile?.redFlags}</div>
              <div className="font-medium flex items-center gap-1"><Flag fill="red" /> Flags:</div>
            </div>
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="text-lg font-semibold">{profile?.greenFlags}</div>
              <div className="font-medium flex items-center gap-1"><Flag fill="green" /> Flags:</div>
            </div>
          </div>

          <div className="flex gap-4 my-4 flex-1 flex-col sm:flex-row sm:gap-6">
            <Button onClick={handleRed} className={clsx("py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive flex-1", activeRed && "bg-redFlagColorActive")}><Flag />Vote Red Flag </Button>
            <Button onClick={handleGreen} className={clsx("py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive flex-1", activeGreen && "bg-greenFlagColorActive")}> <Flag />Vote Green Flag </Button>
          </div>

        </div>

        <div className="shadow-[4px_4px_0px_black] border-3 border-black md:shadow-[6px_6px_0px_black]  max-w-2xl mx-auto my-6 p-6 flex flex-col gap-4 ">
          <div className="flex gap-4 mb-6">
            <Input placeholder="Write your observations..." value={inComment} onChange={e => setInComment(e.currentTarget.value)} />
            <Button onClick={addComment}>Add</Button>
          </div>
          <div>
            <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
              <div>
                <div>Anonymus:</div>
                <div className="text-muted-foreground">Loves cat food and he is too fat. </div>
              </div>
              {/* <button className="px-1"><Heart /> </button> */}
              <LikeButton className="px-1" _id="0" defaultLiked={true} />
            </div>
          </div>

          {
            comments ? comments.map(e => {
              return (
                <div key={e._id} className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
                  <div>
                    <div>Anonymus:</div>
                    <div className="text-muted-foreground">{e.content}</div>
                  </div>
                  <LikeButton className="px-1" _id={e._id} defaultLiked={userTokenData?.userData?.likedComments.includes(e._id)} />
                </div>

              )
            }) : null
          }


          <div className="w-full justify-center mt-6 mb-4" style={{ display: commentLoader ? "flex" : "none" }}><BarLoader color="#ffd12e" speedMultiplier={1.8} /></div>

        </div>

      </div >
    </div >
  )
}

export default Profile
