import axios from "@/axios";

export const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`jwt_token=`);
  const token = parts.length === 2 ? parts.pop().split(";").shift() : null;

  return token;
};

export const setToken = (token, expires_in) => {
  let expires = new Date();
  expires.setTime(expires.getTime() + expires_in * 1000);
  document.cookie = `jwt_token=${token}; expires=${expires.toUTCString()}; path=/`;

  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export const deleteToken = () => {
  document.cookie =
    "jwt_token=; Max-Age=0; path=/; domain=" + location.hostname;
};
