import styles from './App.module.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home'
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className={styles.App}>
      <Navigation/>
        <Switch>
          <Route exact path="/"  render={() => <Home /> } />
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
