import React from 'react';
import Navbar from './components/Navbar'
import Home from "./components/Home"
import Footer from './components/Footer'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import conversions from './components/conversions'
import Metrics from './components/Metrics'
import {NavToggle} from './components/Navbar'
import Currency from './components/Currency'

function App() {
    return ( <div className = "App" >
        <div className="top">
          <Router>
          <Navbar />
          <NavToggle />
            <Switch>
                {
                  Object.keys(conversions).map((key)=>
                    <Route path={`/${key}/:slug`} key={key} render={({match})=><Metrics match={match} metric={key}/>} />         
                    )
                }
                <Route path='/currency' render={Currency}  />
                <Route path='/:name' render={({match})=><Home match={match}/>}  />
                <Route path="/">
                  <Home/>
                </Route>
              </Switch>
          </Router>
          
        </div>
        <Footer />
        </div>
    );
}

export default App;