import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./components/routes/HomePage";
import Cart from "./components/routes/CartPage";
import Browse from "./components/routes/BrowsePage";
import Profile from "./components/routes/ProfilePage";
import Comment from "./components/form";
import star from "./components/star";

import { Route, BrowserRouter as Router } from "react-router-dom";

import "./css/index.css";
// import Login from "./components/Login";
import ApplicationForm from "./components/ApplicationForm";
import ValidationLoginForm from "./components/ValidatedLoginForm";
// import { Home } from './Home/Home';

const routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/browse" component={Browse} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={ValidationLoginForm} />
      <Route path="/signUp" component={ApplicationForm} />
      <Route path="/comment" component={Comment} />
      <Route path="/star" component={star} />
    </div>
  </Router>
);
/*class App extends Component {

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/NavBar';
import Home from './components/routes/HomePage';
import Cart from './components/routes/CartPage';
import Browse from './components/routes/BrowsePage';
import Profile from './components/routes/ProfilePage';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import './css/index.css';

// const routes = (
//     <Router>
//         <div>
//             <Route exact path='/' component={Home} />
//             <Route path='/browse' component={Browse} />
//             <Route path='/cart' component={Cart} />
//         </div>
//     </Router>
// );

class App extends Component {

constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Navbar />
                        <Route exact path='/' component={Home} />
                        <Route path='/browse' component={Browse} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/profile' component={Profile} />
                    </div>
                </Router>
            </div>
        );
    }

}*/

ReactDOM.render(routes, document.getElementById("root"));

// }

// ReactDOM.render(<App />, document.getElementById("root"));
