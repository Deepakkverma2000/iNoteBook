import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Login( props ) {
    const [credential, setCredential] = useState({email:"", password:""})
    const navigate = useNavigate(); 

const handleSubmit= async(e)=>{
   e.preventDefault();
   const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email:credential.email,password:credential.password}),
    
  })
  const json = await response.json();
    console.log(json);
    if(json.success === true)
    {
        //redirect
        localStorage.setItem('token',json.authTocken);
        
         navigate("/");
         props.showAlert("SignIn Successfully","Success")
    }
    else{
        props.showAlert("Invalid Credentials","Danger")
    }
}

const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  
  return (
    <>
        <div className='container  my-2'>
          <h1 className='my-3'>Login to use iNotebook App</h1>
               <form   onSubmit={handleSubmit}> 
                    <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                     <div className="col-sm-10">
                         <input type="email" className="form-control" id="email" name='email'  onChange={onChange}/>
            </div>
        </div>
                   <div className="row mb-3">
               <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
               <div className="col-sm-10">
               <input type="password" className="form-control" id="password" name='password'  onChange={onChange}/>
             </div>

            </div>
            <Link className="nav-link active mx-5 my-4" aria-current="page" to="/forgetPassword">Forget Password ?</Link>
  
 
            <button type="submit" className="btn btn-primary " style={{Color :'blue' }} >Sign in</button>
           </form>
          </div>
    </>
  )
}
