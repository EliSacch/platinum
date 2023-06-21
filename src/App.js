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
import AppointmentsEditForm from './pages/appointments/AppointmentsEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import StaffDashboard from './pages/staff/StaffDashboard';
import ServicesPage from './pages/home/ServicesPage';


function App() {

  return (
    <div className={styles.App}>
      
      <Navigation />
      <Switch>

        {/* -------------- Home page -------------- */}
        <Route
          exact
          path="/"
          render={() => <Home />}
        />

        <Route
          exact
          path="/services"
          render={() => <ServicesPage />}
        />

        {/* -------------- Profiles pages -------------- */}
        <Route
          exact
          path="/profile"
          render={() => <ProfilePage />}
        />

        {/* -------------- Auth pages -------------- */}
        <Route
          exact
          path="/signin"
          render={() => <SignInForm />}
        />

        <Route
          exact
          path="/signup"
          render={() => <SignUpForm />}
        />

        {/* -------------- Client facing appointments pages -------------- */}
        <Route
          exact
          path="/my-appointments"
          render={() => (
            <MyAppointments />
          )} />

        <Route
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

        <Route
          exact
          path="/my-appointments/:id/edit"
          render={() => (
            <AppointmentsEditForm />
          )} />

        {/* -------------- Staff pages -------------- */}
        <Route
          exact
          path="/dashboard"
          render={() => <StaffDashboard hideNav="true" />}
        />

        {/* -------------- Other pages -------------- */}
        <Route render={() => <p>Page not found!</p>} />

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
