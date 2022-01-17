import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import jwtDecode from "jwt-decode";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Rental from './components/Rental/Rental';
import Logout from "./components/Logout/Logout";

function App() {
  const [user, setUserId] = useState(" ");

  useEffect(() => {
    getToken();
  },[]
  );

  const getToken = () => {
      let jwt = window.localStorage.getItem('token');
      if(jwt){
        let user = jwtDecode(jwt);
        setUserId(user);
      }
  }

  return (
    <Router>
      <div className="App">
        <NavBar user={user} />
        <Switch>
        <Route
          path ='/'
          exact render = {props => {
              if (!user.email){
                return <Redirect to ="/login"/>
            }}
          }/>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/rental/:carid" component={Rental} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
        </Switch>
      </div>
      </Router>
  );
}

export default App;
