import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // reduce method to loop through the new page of results
      // and append it to the previous results
      results: data.results.reduce((acc, cur) => {
        // check that the current results are not included in the next page
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// to save the token timestamp in local storage
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// check if we should refresh token or not
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// To remove the timestamp from local storage if token expired or on log out
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
