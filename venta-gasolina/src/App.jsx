// // import './App.css';
// import Header from './components/Header';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Ventas } from "views/Ventas";
// import { Venta } from "components/Venta";
// import { Productos } from 'views/Productos';
// import { Producto } from 'components/Producto';
// import Usuarios from 'views/Usuarios';
// import Login from 'views/Login';

// function App() {
//   const [isUsersignedIn, setIsUserSignedIn] = useState(true);

//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       return setIsUserSignedIn(true);
//     }

//     setIsUserSignedIn(false);
//   })
//   if (isUsersignedIn === true) {
//   return (
//     <>
//       {/*  */}

//       <Router>
//       <Switch>
//           <Route exact path="/" component={Ventas} />
//          </Switch>
//         <Header />
//         <Switch>
//           <Route exact path='/ventas' component={Ventas} />
//           <Route exact path='/ventas/:id' component={Venta} />
//           <Route exact path='/productos' component={Productos} />
//           <Route exact path='/productos/:id' component={Producto} />
//           <Route exact path='/usuarios' component={Usuarios} />
//           <Route exact path='/'>
//             <Login />
//           </Route>
//         </Switch>
//       </Router>
//     </>
//    );
//   }
//   else {
//     return (
//       <Router>
//         <Switch>
//           <Route path="/" component={Login} />
//         </Switch>
//       </Router>
//     );
//   }
// }
// export default App;
import './App.css'
import React, { useState } from 'react';
//import auth from '@react-firebase/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import PublicLayout from 'layouts/PublicLayout';
// import LayoutLogin from 'layouts/LayoutLogin';

import {
  BrowserRouter as Router,
  Switch,
  Route,
}
  from "react-router-dom";
// import Home from 'views/Home';
import Login from 'views/Login';
import {Ventas} from 'views/Ventas';
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
          <Route exact path="/" component={Ventas} />
         </Switch>
       </Router>
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


