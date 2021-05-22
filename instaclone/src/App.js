import React, { useEffect,createContext,useReducer,useContext } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory,useParams} from 'react-router-dom'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import Home from './components/screens/Home'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribesUserPosts from './components/screens/SubscribesUserPosts'

export const UserContext=createContext()

const Routing=()=>{
  
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)

  useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"))
      if(user)
      {
        dispatch({type:"USER",payload:user})
       
      }
      else{
        history.push('/signin')
      }
  },[])
    return(
          <Switch>
          <Route exact path="/" >
          <Home />
          </Route>
          <Route path="/signup" >
              <Signup />
          </Route>
          <Route path="/login" >
              <Login />
          </Route>
          <Route exact path="/profile" >
              <Profile />
          </Route>
          <Route path="/createpost" >
              <CreatePost />
          </Route>
          <Route path="/profile/:userid" >
              <UserProfile />
          </Route>
          <Route path="/myfollowingpost" >
              <SubscribesUserPosts />
          </Route>
    </Switch>
    )
}


function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
   <Navbar />
   <Routing />
   </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;
