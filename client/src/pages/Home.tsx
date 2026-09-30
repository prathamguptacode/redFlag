import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Userbar from "../components/Userbar"
import { BarLoader, PulseLoader } from "react-spinners"
import { toast } from "sonner"
import api from "../api/api"
import { useInView } from "react-intersection-observer"

export type UserT = {
  _id: string,
  name: string,
  username: string,
  redFlags: number,
  greenFlags: number,
  imageUrl: string
}

type CursorT = {
  flag: number,
  id: string,
}

type UserResT = {
  users: UserT[],
  hasNext: boolean
}

function Home() {

  const [loader, setLoader] = useState(true)
  const [users, setUsers] = useState<UserT[]>([])
  const [cursor, setCursor] = useState<CursorT | null>(null)
  const { ref, inView } = useInView()
  const [fetching, setFetching] = useState(false)
  const [hasNext, setHasNext] = useState(false)


  useEffect(() => {
    (async () => {
      try {
        if (cursor == null) {
          const res = await api.get<UserResT>("/users")
          setUsers(res.data.users)
          setHasNext(res.data.hasNext)
          setLoader(false)
        } else {
          if (hasNext == true) {
            setFetching(true)
            const res = await api.get<UserResT>(`/users?flag=${cursor.flag}&id=${cursor.id}`)
            setUsers(prev => [...prev, ...res.data.users])
            setHasNext(res.data.hasNext)
            setFetching(false)
          }
        }
      } catch {
        toast.error("Something went wrong, Please try again later")
      }
    })();
  }, [cursor])


  useEffect(() => {
    if (inView) {
      if (users.length > 0) {
        const flag = users[users.length - 1].redFlags
        const id = users[users.length - 1]._id
        setCursor({ flag, id })
      }
    }
  }, [inView])


  return (
    <div>
      <Navbar />

      <div className="absolute top-0 left-0 h-full w-full justify-center items-center" style={{ display: loader ? "flex" : "none" }}>
        <BarLoader color="#ffd12e" speedMultiplier={1.8} />
      </div>

      <div className="flex flex-col gap-4 px-2 py-4 md:p-4 ">
        {
          users.map((e, i) => {
            if (i == users.length - 3) {
              return (
                <div key={e._id}>
                  <div ref={ref} />
                  <Userbar key={i} name={e.name} username={e.username} imageUrl={e.imageUrl} redFlags={e.redFlags} greenFlags={e.greenFlags} _id={e._id} />
                </div>
              )
            }
            return <Userbar key={i} name={e.name} username={e.username} imageUrl={e.imageUrl} redFlags={e.redFlags} greenFlags={e.greenFlags} _id={e._id} />
          })
        }
        <div style={{ display: fetching ? "flex" : "none" }} className="justify-center my-4"><PulseLoader color="#ffd123" speedMultiplier={1.4} /> </div>
      </div>


    </div>
  )
}

export default Home
