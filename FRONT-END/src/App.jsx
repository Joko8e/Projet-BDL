import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css'



///// PAGES
import Home from './pages/HomePage/Home'
import Nothing from './pages/PageNothing/Nothing';

//// ADMIN



///// TEMPLATE


function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='*' element={<Nothing/>}/>
    </Routes>
  )
}

export default App
