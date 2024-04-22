import './App.css';
import React, { useEffect, useState } from "react";
import Suggest from './Suggest';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Ratings from './Ratings';
import Suggestions from './Suggestions';
import StationsComponent from './StationsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/suggest">
             <Suggest />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/ratings">
              <Ratings />
            </Route>
            <Route path="/stationscomponent">
              <StationsComponent />
            </Route>
            <Route path="/suggestions">
              <Suggestions />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
