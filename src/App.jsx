import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Rental from './components/Rental';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/rental" component={Rental} />
        </Switch>
      </div>
      </Router>
  );
}

export default App;
