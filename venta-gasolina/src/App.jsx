// import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Ventas } from "views/Ventas";
import { Venta } from "components/Venta";
import { Productos } from 'views/Productos';
import { Producto } from 'components/Producto';
import Usuarios from 'views/Usuarios';
import Login from 'views/Login';
import { UsuarioFiltrado } from './views/UsuarioFiltrado';

function App() {
  return (
    <>
      {/*  */}

      <Router>
        <Header />
        <Switch>
          <Route exact path='/ventas' component={Ventas} />
          <Route exact path='/ventas/:id' component={Venta} />
          <Route exact path='/productos' component={Productos} />
          <Route exact path='/productos/:id' component={Producto} />
          <Route exact path="/Usuarios/:id" component={UsuarioFiltrado} />
          <Route exact path='/Usuarios' component={Usuarios}/>
          <Route exact path='/' component={Login}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
