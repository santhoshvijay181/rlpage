import React, { useState } from 'react'
import './RegisterPage.css'
import { RegisterApi } from '../servece/API'
import { storageData } from '../servece/Storage'
import { isAuthenticated } from '../servece/Auth'
import {Link, Navigate} from 'react-router-dom'
import NavBar from '../components/NavBar'


const RegisterPage = () => {

const initialStatuteErrors={
    email:{required:false},
    password:{required:false},
    name:{required:false},
    custom_error:null

}
const [error,setError]=useState(initialStatuteErrors)

const [Loading,setLoading]=useState(false)
const [input,setInput]=useState({
    email:"",
    password:"",
    name:""
})

//   function

//form sending 
const handleSubmet =(event)=>{
event.preventDefault();

let errors =initialStatuteErrors 
let haserror=false

if(input.name == "" ){
    errors.name.required=true
    haserror=true
}
if(input.email == "" ){
    errors.email.required=true
    haserror=true
}
if(input.password == "" ){
    errors.password.required=true
    haserror=true
}
if (!haserror){
    setLoading(true)
    RegisterApi(input).then((response)=>{
      storageData(response.data.idToken)
        }).catch((err)=>{
                if (err.response.data.error.message == "EMAIL_EXISTS" ){
                    setError({...error,custom_error:"Allredy this Email has been Register"})
                }else if(String(err.response.data.error.message).includes("WEAK_PASSWORD" )){
                    setError({...error,custom_error:"Password should be at least 6 characters"})
                }
        }).finally(()=>{
            setLoading(false)
})
}
setError({...errors})
}               

 const handleInput=(event) => {
setInput({ ...input, [event.target.name]: event.target.value })
 }

if(isAuthenticated()){  //true or false
 return <Navigate to='/dashboard' />
}

  return (
    <div>
          <NavBar/>
            <section className="register-block">
                <div className="container">
                <div className="row ">
                    <div className="col register-sec">
                        <h2 className="text-center">Register Now</h2>
                        <form  onSubmit={handleSubmet} className="register-form" action="" >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
            
                            <input  type="text" className="form-control" onChange={handleInput}  name="name" id=""  />
                       {error.name.required ?
                        (<span className="text-danger" >
                                    Name is required.
                                </span> ): null }
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1"  className="text-uppercase">Email</label>
                
                                <input  type="text"  className="form-control" onChange={handleInput}  name="email" id=""  />
                            
                             { error.email.required ? 
                                (<span className="text-danger" >
                                    Email is required.
                                </span>) : null }
                                
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password" onChange={handleInput} name="password" id="" />
                        {error.password.required ?  
                        (<span className="text-danger" >
                                Password is required.
                            </span>) : null }
                        </div>
                        <div className="form-group">
            
                            <span className="text-danger" >
                         {error.custom_error?
                            <p>{error.custom_error}</p> : null
                        }  
                          </span>
                            {Loading ? 
                            (<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>) : null }
            
                            <input type="submit" className="btn btn-login float-right"  disabled={Loading}  value="Register" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Already have account ? Please  <Link  to="/LoginPage">Login</Link>
                        </div>
            
            
                        </form>
            
            
                    </div>
            
                </div>
            
            
                </div>
            </section>    
        </div>
  )
}

export default RegisterPage