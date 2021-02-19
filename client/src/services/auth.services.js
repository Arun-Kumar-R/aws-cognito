import axios from "axios";

import ApiUrl from "../config/urls";
// import {setToken} from '../utils/helper';
// import { authHeader } from '../utils/helper';

// Register services
export const registerService = (user) => {
  console.log("user service", user);
  return axios({
    method: "POST",
    url: `${ApiUrl.createUser}`,
    data: user,
  })
    .then((res) => {
      if (res.status === 201) {
        return res.data;
      } else {
        return Promise.reject("Please try again");
      }
    })
    .catch(function (error) {
      let isResponse = error.response;
      if (isResponse && isResponse.data) {
        return Promise.reject(isResponse.data.message);
      } else {
        return Promise.reject(error);
      }
    });
};
