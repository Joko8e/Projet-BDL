import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css'



///// PAGES
import Home from './pages/HomePage/Home'
import Nothing from './pages/PageNothing/Nothing';

//// ADMIN
import Dashboard from './admin/pageDashboard/Dashboard';
import Marque from './admin/pageMarque/Marque';
import DetailMarque from './pages/DetailMarque/DetailMarque';
import DetailProduct from './pages/DetailProduct/DetailProduct';


///// TEMPLATE
import TemplateAdmin from './components/template/TemplateAdmin';
import Template from './components/template/Template';

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Template/>}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/dashboard' element={<TemplateAdmin/>}>
        <Route index element={<Dashboard/>} />
        <Route path='marque' element={<Marque/>}/>
        <Route path='marque/detail/idMarque' element={<DetailMarque />} />
        <Route path='marque/detail/idProduct' element={<DetailProduct/>}/>
      </Route>
      
      
      <Route path='*' element={<Nothing/>}/>
    </Routes>
  )
}

export default App
