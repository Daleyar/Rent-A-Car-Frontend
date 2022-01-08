import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import jwtDecode from "jwt-decode";
import Home from './components/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile';
import Register from './components/Register';
import Rental from './components/Rental';

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
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/rental" component={Rental} />
        <Route path="/profile" component={Profile} />
        </Switch>
      </div>
      </Router>
  );
}

export default App;
