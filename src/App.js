import styles from './App.module.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home/Home'
import { Route, Switch } from "react-router-dom";

import './api/axiosDefaults';

import SignUpForm from './pages/auth/SignUpFrom';
import SignInForm from './pages/auth/SignInFrom';
import AppointmentsCreateForm from './pages/appointments/AppointmentsCreateForm';
import AppointmentPage from './pages/appointments/AppointmentPage';
import MyAppointments from './pages/appointments/MyAppointments';


function App() {

  return (
    <div className={styles.App}>
      <Navigation />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home />} />
        <Route
          exact
          path="/signin"
          render={() => <SignInForm />} />
        <Route exact path="/signup" render={() => <SignUpForm />} />
        <Route
          exact
          path="/my-appointments"
          render={() => (
            <MyAppointments />
          )} />
        <Route
          exact
          path="/my-appointments/create"
          render={() => (
            <AppointmentsCreateForm
              message="Sorry, there are no treatments you can book online. Pleas contact us."
            />
          )} />
          <Route
          exact
          path="/my-appointments/:id"
          render={() => (
            <AppointmentPage />
          )} />
        <Route render={() => <p>Page not found!</p>} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
