// import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ventas from 'views/Ventas';
import {Productos} from 'views/Productos';
import {Producto} from 'components/Producto';
import Usuarios from 'views/Usuarios';
import Login from 'views/Login';



function App() {
  return (
    <>


    {/*  */}


      <Router>
        <Header />
        <Switch>
          <Route exact path='/ventas' component={Ventas}>
  
          </Route>
          <Route exact path='/productos' component={Productos}>
          </Route>
          <Route exact path='/productos/:id'>
            <Producto />
          </Route>
          <Route exact path='/usuarios'>
            <Usuarios />
          </Route>

        </Switch>
      </Router>

      <Router>
        <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
