import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import "./api/axiosDefaults";
import SignInForm from './pages/auth/SignInForm';


function App() {

  return (
        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={()=> <h1>Home Page</h1>} />
              <Route exact path="/signin" render={()=> <SignInForm />} />
              <Route exact path="/signup" render={()=> <SignUpForm />} />
              <Route exact path="/games" render={()=> <h1>Games</h1>} />
              <Route exact path="/rentals" render={()=> <h1>Rentals</h1>} />
              <Route exact path="/profile" render={()=> <h1>Profile</h1>} />
              <Route render={()=> <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;