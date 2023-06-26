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

// Save the refresh token timestamp
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// make sure to refresh token only for logged in users
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// To remove the timestamp when refresh token expires or user logs out
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};