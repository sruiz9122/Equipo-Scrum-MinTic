// import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ventas from 'views/Ventas';
import Productos from 'views/Productos';
import Usuarios from 'views/Usuarios';
import Login from 'views/Login';
import { UsuarioFiltrado } from './views/UsuarioFiltrado';



function App() {
  return (
    <>


      <Router>
        <Header />
        <Switch>
          <Route exact path='/Ventas'>
            <Ventas />
          </Route>
          <Route exact path='/Productos'>
            <Productos />
          </Route>
          <Route exact path="/Usuarios/:id" component={UsuarioFiltrado} />
          <Route exact path='/Usuarios'>
            <Usuarios />
          </Route>

        </Switch>
      </Router>

      <Router>
        <Route exact path='/'>
          <Login />
        </Route>
      </Router>
    </>
  );
}

export default App;
