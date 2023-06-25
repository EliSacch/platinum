
import './api/axiosDefaults';
// router
import { Route, Switch } from "react-router-dom";
// custom components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SignUpForm from './pages/auth/SignUpFrom';
import SignInForm from './pages/auth/SignInFrom';
import Home from './pages/home/Home';
import AppointmentsCreateForm from './pages/appointments/AppointmentsCreateForm';
import AppointmentPage from './pages/appointments/AppointmentPage';
import MyAppointments from './pages/appointments/MyAppointments';
import AppointmentsEditForm from './pages/appointments/AppointmentsEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import StaffDashboard from './pages/staff/StaffDashboard';
import ServicesPage from './pages/home/ServicesPage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
// custom css
import styles from './App.module.css';


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
        <Route
          exact
          path="/profiles/:id/edit/username"
          render={() => <UsernameForm />}
        />
        <Route
          exact
          path="/profiles/:id/edit/password"
          render={() => <UserPasswordForm />}
        />
        <Route
          exact
          path="/profiles/:id/edit"
          render={() => <ProfileEditForm />}
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
