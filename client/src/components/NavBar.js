import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function NavBar() {
   const token  = localStorage.getItem("token")
   const navigate = useNavigate()
    return (
        <nav>
        <div className="nav-wrapper nav-container">
          <Link to="/profile" className="brand-logo left">Todo App</Link>
          <ul id="nav-mobile" className="right">
            {
              token ?
              <>
            
               <li><button className="red btn" onClick={()=>{
                 localStorage.removeItem("token")
                 navigate('/login')
               }}>Logout</button></li>

              </>:
              <>
               <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
               </>
            }
            
           
          </ul>
        </div>
      </nav>
    )
}
