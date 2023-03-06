import React from 'react';
import {
  Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  let navigate = useNavigate();
  const handleLogOut =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }


  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>

          </ul>
         
         {!localStorage.getItem('token') ?<form className="d-flex" role="search">
           
           <Link className="btn btn-outline-success mx-1" to="/login" type="submit">Login</Link>

            <Link className="btn btn-outline-success mx-5" to="/signup" type="submit">SignUp</Link>
          </form>  : <div class="dropdown mr-3">
                      <button class="btn btn-secondary dropdown-toggle mx-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-user "></i>
                          </button>

                          <ul class="dropdown-menu">
                      
                      <li><a class="dropdown-item" href="#"><i class="fa-thin fa-file-user"></i>Profile</a></li>
                      <li><a class="dropdown-item" href="#" onClick={handleLogOut}><i class="fa-solid fa-right-from-bracket"></i> Log Out</a></li>
                      </ul>
                   </div>  }
        </div>
      </div>
    </nav>
    </>
  )
}

