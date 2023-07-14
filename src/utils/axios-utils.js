import axios from "axios";
import { removeItemsOnLogout } from "./local-storage-utils";
import { HOST_URL } from "../config";
let result;

const createHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("accessToken");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const create = async (endpoint, payload) => {
  await axios
    .post(`${HOST_URL}/${endpoint}`, payload, {
      headers: createHeaders(),
    })
    .then((response) => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        removeItemsOnLogout();
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const read = async (endpoint) => {
  await axios
    .get(`${HOST_URL}/${endpoint}`, {
      headers: createHeaders(),
    })
    .then((response) => {
      console.log(response);
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        removeItemsOnLogout();
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const update = async (endpoint, payload) => {
  await axios
    .put(`${HOST_URL}/${endpoint}`, payload, {
      headers: createHeaders(),
    })
    .then((response) => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        removeItemsOnLogout();
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const deleteData = (endpoint) => {
  axios
    .delete(`${HOST_URL}/${endpoint}/${id}`, {
      headers: createHeaders(),
    })
    .then(() => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        removeItemsOnLogout();
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

export { create, read, update, deleteData };
