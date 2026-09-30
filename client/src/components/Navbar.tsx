import mystyle from './navbar.module.css'
import { Flag, UserRoundPlus, X, } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import type { UserT } from '../pages/Home'
import api from '../api/api'
import { toast } from 'sonner'
import clsx from 'clsx'

type resT = {
  users: UserT[]
}


function Navbar() {

  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [data, setData] = useState<UserT[]>()

  async function reqSearch(q: string) {
    try {
      const res = await api.get<resT>(`/user/search/${q}`)
      setData(res.data.users)
    } catch {
      toast.warning("Something went wrong", { position: "top-center", })
    }
  }

  useEffect(() => {
    if (query) {
      const idT = setTimeout(() => {
        reqSearch(query)
      }, 300);
      return () => {
        clearTimeout(idT)
      }
    }
  }, [query])

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const elm = document.getElementById("pop")
        if (elm) {
          elm.hidePopover()
        }
      }
    })
  }, [])




  return (
    <div className={mystyle.navbar}>
      <button className={mystyle.logoBox} onClick={() => navigate("/")} >
        <div><Flag fill='#FF645C' size={32} /></div>
        <div className={mystyle.logo}>Red Flags</div>
      </button>
      <div className={mystyle.searchBox} ref={ref}>
        <Input placeholder='search...' type='text' value={query} onChange={e => setQuery(e.currentTarget.value)} onFocus={() => {
          const elm = document.getElementById("pop")
          if (elm) {
            elm.showPopover()
          }
        }}
        />
        {
          query ?
            <button className={mystyle.closeBtn} onClick={() => {
              setQuery("")
              const elm = document.getElementById("pop")
              if (elm) {
                elm.hidePopover()
              }
            }}><X /></button>
            : null
        }


        <div id="pop" popover='manual' className={clsx(data ? mystyle.pop : null)}>
          {
            data ? data.length < 1 ? <div className='px-[12px]' >No user found</div>
              :
              data.map((e) => {
                return <div className={mystyle.opt} onClick={() => {
                  navigate(`/${e.username}`)
                  setQuery("")
                  const elm = document.getElementById("pop")
                  if (elm) {
                    elm.hidePopover()
                  }
                }}>
                  <div>
                    <div className='text-lg'>{e.name}</div>
                    <div className='text-sm text-muted-foreground'>{e.username}</div>
                  </div>
                  <div className='h-16 border-2 aspect-square overflow-hidden '>
                    <img src={e.imageUrl} />
                  </div>
                </div>
              }) : null
          }
        </div>
      </div>
      <div className='fixed z-100 bottom-4 right-4 md:relative md:bottom-0 md:right-0'>
        <Button className='py-3 md:py-2' onClick={() => navigate("/contribute")}>
          <div className={mystyle.btnContent}>
            <div>Contribute</div> <UserRoundPlus size={17} />
          </div>
        </Button>
      </div>

    </div >
  )
}

export default Navbar
