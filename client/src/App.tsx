import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Form from './pages/Form';
import Err from './pages/Err';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contribute' element={<Form />} />
        <Route path='*' element={<Err />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
