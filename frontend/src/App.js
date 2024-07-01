import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import SignUpForm from './pages/auth/SignUpForm';
import "./api/axiosDefaults";
import SignInForm from './pages/auth/SignInForm';
import GameCreateForm from './pages/games/GameCreateForm';
import GamePage from './pages/games/GamePage';
import GamesPage from './pages/games/GamesPage';
import GameEditForm from './pages/games/GameEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import ReviewCreateForm from './pages/reviews/ReviewCreateForm';
import ReviewsPage from './pages/reviews/ReviewsPage';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from './components/NotFound';
import ReviewPage from './pages/reviews/ReviewPage';





function App() {

  return (
        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/"
               render={()=>
                <GamesPage message="No results found. Search for a different game." />} />
              <Route exact path="/signin" render={()=> <SignInForm />} />
              <Route exact path="/signup" render={()=> <SignUpForm />} />
              <Route exact path="/games/create" render={()=> <GameCreateForm />} />
              <Route exact path="/games/:id" render={()=> <GamePage/> } />
              <Route exact path="/games/:id/edit" render={()=> <GameEditForm/> } />
              <Route exact path="/reviews/create" render={()=> <ReviewCreateForm />} />
              <Route exact path="/reviews/" render={()=> <ReviewsPage />} />
              <Route exact path="/reviews/:id" render={()=> <ReviewPage />} />
              <Route exact path="/profiles/:id" render={()=> <ProfilePage />} />
              <Route exact path="/profiles/:id/edit/username" render={()=> <UsernameForm />} />
              <Route exact path="/profiles/:id/edit/password" render={()=> <UserPasswordForm />} />
              <Route exact path="/profiles/:id/edit/" render={()=> <ProfileEditForm />} />
              <Route render={()=> <NotFound />} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;