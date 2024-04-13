import React from 'react'
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/Dashboard'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes> 
        <Route path='/' element={ <RegisterPage/>}/>  
        <Route path='/LoginPage' element={ <LoginPage/>}/>  
        <Route path='/DashboardPage' element={ <DashboardPage/>}/>  
       
         </Routes>

           </BrowserRouter>
 
    </div>
    
  )
}




export default App
