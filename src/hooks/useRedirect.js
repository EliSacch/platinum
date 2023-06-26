import { useEffect } from "react";
import axios from "axios";
// router
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // what to do if user is logged in
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // what to do if user is logged out
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};