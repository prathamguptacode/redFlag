import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Form from './pages/Form';
import Err from './pages/Err';
import { Toaster } from './components/ui/Sonner';
import { useEffect, useState } from 'react';
import api from './api/api';
import { isAxiosError } from 'axios';
import UserTokenContext from './context/userToken';

export type UserTokenDataT = {
  redFlags: string[],
  greenFlags: string[],
  likedComments: string[]
}

function App() {

  const [userTokenData, setUserTokenData] = useState<UserTokenDataT>({ redFlags: [], greenFlags: [], likedComments: [] })

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<UserTokenDataT>("/token/data")
        setUserTokenData(res.data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status == 400) {
            await api.get("http://localhost:3000/token/new")
          }
        }
      }
    })()
  }, [])


  return (
    <UserTokenContext.Provider value={{ userData: userTokenData, setUserData: setUserTokenData }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contribute' element={<Form />} />
          <Route path='/:username' element={<Profile />} />
          <Route path='*' element={<Err />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserTokenContext.Provider>
  )
}

export default App
