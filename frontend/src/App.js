import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Registration from "./views/Registration";
import Profile from "./views/Profile";
import Cart from "./components/Cart";
import Products from "./views/Products";
import About from "./components/About";
import Activation from "./views/Activation";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route
          path="/registration"
          exact
          render={(props) => <Registration {...props} />}
        />
        <Route
          path="/profile"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route path="/cart" exact render={(props) => <Cart {...props} />} />
        <Route
          path="/product"
          exact
          render={(props) => <Products {...props} />}
        />

        <Route path="/about" exact render={(props) => <About {...props} />} />
        <Route
          path="/auth/activation/:token"
          exact
          render={(props) => <Activation {...props} />}
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
