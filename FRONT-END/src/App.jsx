import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, useLocation } from 'react-router-dom';
// useLocation permet de récupérer l'emplacement actuel dans l'application
import { AnimatePresence } from "framer-motion";
// AnimatePresence permet d'animer les composants qui sont montés et démontés

///CSS
import './App.css'

///// PAGES
import Home from './pages/HomePage/Home'
import Nothing from './pages/PageNothing/Nothing';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import Register from './pages/PageAuth/Register';
import Sign from './pages/PageAuth/Sign';
import Contact from './pages/PageContact/Contact';
import Historique from './pages/PageHistorique/Historique';
import CGV from './pages/PageFooter/CGV';
import MentionsLegale from './pages/PageFooter/MentionsLegales';


//// ADMIN
import Dashboard from './admin/pageDashboard/Dashboard';
import Marque from './admin/pageMarque/Marque';
import DetailMarque from './pages/DetailMarque/DetailMarque';
import Product from './admin/pageProduct/Product';
import UpdateMarque from './pages/UpdateMarque/UpdateMarque';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import User from './admin/PageUser/User';
import DetailUser from './admin/PageUser/DetailUser';
import UpdateUser from './admin/PageUser/UpdateUser';
import Commande from './admin/PageCommande/Commande';
import DetailCommande from './admin/PageCommande/DetailCommande';


//SERVICES
import PublicRoute from './utils/helpers/PublicRoute';
import PrivateRoute from './utils/helpers/PrivateRoute';
import PrivateRouteAdmin from './utils/helpers/PrivateRouteAdmin';

///// TEMPLATE
import TemplateAdmin from './components/template/TemplateAdmin';
import Template from './components/template/Template';



function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false} >
      <Routes location={location} key={location.pathname}>
        {/* Routes Front-end Public */}
      <Route path='/' element={<Template/>}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='cgv' element={<CGV />} />
          <Route path='mentionLeg' element={<MentionsLegale/>}/>
      </Route>
        
        {/* Routes publiques (non accessible si connecté) */}
      <Route element={<PublicRoute />}>
        <Route path='/' element={<Template/>}>  
            <Route path='sign' element={<Sign/>}/>
            <Route path='register' element={<Register />} />
        </Route>
      </Route>
        
        {/* Route privé, accessible uniquement aux utilisateurs connectés */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Template/>}>
            <Route path='historique' element={<Historique />} />
          </Route>
      </Route>
      
      {/* Route Admin */}
      <Route element={<PrivateRouteAdmin/>}>
        <Route path='/dashboard' element={<TemplateAdmin/>}>
          <Route index element={<Dashboard/>} />
            <Route path='marque' element={<Marque />} />
            <Route path='user' element={<User />} />
            <Route path='commande' element={<Commande />} />
            <Route path='product' element={<Product/>} />

            {/* Route update */}
            <Route path='marque/update/:idMarque' element={<UpdateMarque/>}/>
            <Route path='product/update/:idProduct' element={<UpdateProduct/>} />
            <Route path='user/update/:idUser' element={<UpdateUser/>} />
            
            {/* Route Detail */}
            <Route path='marque/detail/:idMarque' element={<DetailMarque />} />
            <Route path='product/detail/:idProduct' element={<DetailProduct />} />
            <Route path='user/detail/:idUser' element={<DetailUser />} />
            <Route path='commande/detail/:idCommande' element={<DetailCommande />} />
          </Route>
        </Route>
        
        {/* Route 404 */}
        <Route path='*' element={<Nothing/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default App
