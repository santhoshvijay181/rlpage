import './LoginPage.css'
import { useState } from 'react';
import { storageData } from '../servece/Storage'
import { LoginApi } from '../servece/API';
import { isAuthenticated } from '../servece/Auth'
import {Link, Navigate} from 'react-router-dom'
import NavBar from '../components/NavBar';



export default  function LoginPage  (){
    
const initialStatuteErrors={
    email:{required:false},
    password:{required:false},
    custom_error:null

}
const [error,setError]=useState(initialStatuteErrors)
const [Loading,setLoading]=useState(false)

const [input,setInput]=useState({
    email:"",
    password:""
  
})

//form sending 
const handleSubmet =(event)=>{
    event.preventDefault();
    
    let errors =initialStatuteErrors 
    let haserror=false
    
  
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
       LoginApi(input).then((response)=>{
          storageData(response.data.idToken)
            }).catch((err)=>{
                    if (err.code="ERR_BAD_REQUEST"){
                        setError({...errors,custom_error:"Invalid Credentials."})
                    }
    
                    console.log(err.message)
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
        return <Navigate to='/DashboardPage' />
       }

return(
    <>
       <NavBar />
    <section className="login-block">
    <div className="container">
        <div className="row ">
            <div className="col login-sec">
                <h2 className="text-center">Login Now</h2>
                <form onSubmit={handleSubmet} className="login-form" action="">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                    <input type="email"  className="form-control" onChange={handleInput} name="email"  id="" placeholder="email"  />
                    { error.email.required?
                    (<span className="text-danger" >
                        Email is required.
                    </span>):null
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input  className="form-control" type="password" onChange={handleInput}  name="password" placeholder="password" id="" />
                    { error.password.required?
                    (<span className="text-danger" >
                        Password is required.
                    </span>):null
                    }
                </div>
                <div className="form-group">
                    {Loading ? 
                            (<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>) : null }
                    <span className="text-danger" >
                    { error.custom_error?
                    (<p>{error.custom_error}</p>)
                    :null
                    }
                    </span>
                    <input  type="submit" className="btn btn-login float-right" disabled={Loading}  value="Login" />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                Create new account ? Please <Link  to="/register">Register</Link>
                </div>
                </form>
            </div>
        </div>
    </div>
</section>
</>
 
)
}