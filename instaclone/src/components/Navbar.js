import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = () => {

    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const renderList=()=>{
            if(state)
            {
                return [
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/createpost">Create Post</Link></li>,
                    <li><Link to="/myfollowingpost">Following</Link></li>,
                    <li>
                        <button onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/login')
                        }
                        
                        } className="btn waves-effect waves-light #64b5f6 blue darken-2">Logout</button>
                    </li>
                ]
            }
            else{
                return [
                    <li><Link to="/login">Login</Link></li>,
                    <li><Link to="/signup">SignUp</Link></li>
                ]
            }
    }
    return (
     <nav>
  <div className="nav-wrapper white" >
    <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
    <ul id="nav-mobile" className="right ">
      {renderList()}
    </ul>
  </div>
</nav>

    )
}

export default Navbar
