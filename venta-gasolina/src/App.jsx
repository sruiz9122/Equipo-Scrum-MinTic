// import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ventas from 'views/Ventas';
import { Productos } from 'views/Productos';
import { Producto } from 'components/Producto';
import Usuarios from 'views/Usuarios';
import Login from 'views/Login';

function App() {
  return (
    <>
      {/*  */}

      <Router>
        <Header />
        <Switch>
          <Route exact path='/ventas' component={Ventas} />
          <Route exact path='/productos' component={Productos} />
          <Route exact path='/productos/:id' component={Producto} />
          <Route exact path='/usuarios' component={Usuarios} />
          <Route exact path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
