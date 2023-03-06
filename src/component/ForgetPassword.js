import React,{ useContext ,useState} from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
// const nodemailer = require("nodemailer");


export default function ForgetPassword() {
    
    const context = useContext(noteContext);
    let host = "http://localhost:5000";
 
  const handleSubmit = async( res,req)=>{
    
    // const OTPVerification = async () => {
    //   //API CALL
    //   const response = await fetch(`${host}/api/notes/forgetPass`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //   });
    //   const json = await response.json();
    //   console.log(json);
    //  let OPT = json.seq;
  
    // };
    console.log("OTP verfication");

    
  }

  const [email,setEmail] = useState(null);
  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mx-2 '>
      <h1 className='text-center'>For recover password </h1>
      <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={onchange} name="email" />
    
  </div>
  
  
  <Link type="submit" class="btn btn-primary my-2" to="/OTPpage">Send Email</Link>
</form>

    </div>
  )
}
