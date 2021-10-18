import './App.css'
import React, { useState } from 'react';
//import auth from '@react-firebase/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PublicLayout from 'layouts/PublicLayout';
import LayoutLogin from 'layouts/LayoutLogin';

import {
  BrowserRouter as Router,
  Switch,
  Route,
}
  from "react-router-dom";
import Home from 'views/Home';
import Login from 'views/Login';
import Ventas from 'views/Ventas';
import Productos from 'views/Productos';
import Usuarios from 'views/Usuarios';

//import firebase from 'components/firebase';

function App() {
  const [isUsersignedIn, setIsUserSignedIn] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setIsUserSignedIn(true);
    }

    setIsUserSignedIn(false);
  })
  if (isUsersignedIn === true) {
    return (
      <>
<Router>
     <Switch>
          <Route path="/" component={Home} />
         </Switch>
       </Router>
{/* 
<Router>
        <Switch>
          <Route exact path='/ventas' >
          <PublicLayout>
            <Ventas />
          </PublicLayout>
          </Route>
          <Route exact path='/productos' >
            <PublicLayout>
              <Productos />
            </PublicLayout>
          </Route>
          <Route exact path='/usuarios'>
            <PublicLayout>
              <Usuarios/>
            </PublicLayout>
          </Route>
          
          <Route exact path='/home'>
            <LayoutLogin>
              <Login/>
            </LayoutLogin>
          </Route>
          </Switch>
</Router> */}

</>

    );
  }
  else {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}
export default App;

