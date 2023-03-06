import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
    let navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({name:"",email:"", password:""});


    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/CreateUser", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         
         body: JSON.stringify({name:userDetail.name, email:userDetail.email,password:userDetail.password}),
         
       })
       console.log(userDetail.name,userDetail.email,userDetail.password);
       const json = await response.json();
         console.log(json);
         if(json.success === true)
         {
            console.log(json.authTocken);
            localStorage.setItem('token',json.authTocken);
            navigate("/");
            props.showAlert("Successfully Registered","Success")
         }
         else{
             props.showAlert("Invalid Credentials","Danger")
         }
     }
     const onChange = (e) => {
        setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
      };

  return (
    <>
    <div className="container  my-3">
    <h1  className='my-3'>Create Acoout to use iNotebook App</h1>
    <form onSubmit={handleSubmit}>
  <div className="row mb-3">
    <label htmlFor="name" className="col-sm-2 col-form-label">Full Name</label>
    <div className="col-sm-10">
      <input type="name" className="form-control" id="name" name="name" required minLength={3} onChange={onChange}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="emil" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" id="email" name="email" required onChange={onChange}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10" >
      <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange={onChange} />
      
    </div>
  </div>
 
 
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>
    </div>
    </>
  )
}
