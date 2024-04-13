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
        <Route path='/register' element={ <RegisterPage/>}/>  
        <Route path='/LoginPage' element={ <LoginPage/>}/>  
        <Route path='/DashboardPage' element={ <DashboardPage/>}/>  
        <Route path='/dashboard' element={ <h1>dashborad</h1>}/> 
        <Route path='/' element={ <h1>HOME</h1>}/>  
         </Routes>

           </BrowserRouter>
 
    </div>
    
  )
}




export default App
