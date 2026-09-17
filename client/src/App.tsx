import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Form from './pages/Form';
import Err from './pages/Err';
import { Toaster } from './components/ui/Sonner';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contribute' element={<Form />} />
        <Route path='*' element={<Err />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
