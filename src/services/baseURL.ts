/** @format */

import axios from "axios";

const BASE_URL = "https://admin.fstuogp.com";
// const BASE_URL = "http://127.0.0.1:8000";
const BASE_URL_SIAKAD = "https://back-siakad.fstuogp.com";
// const BASE_URL_SIAKAD = "http://127.0.0.1:8010";
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/json`;
const url_storage = `${BASE_URL}/storage`;

const auth = axios.create({
  baseURL: url_auth,
});

const api = axios.create({
  baseURL: url_api,
});

const storage = axios.create({
  baseURL: url_storage,
});

const api_siakad = axios.create({
  baseURL: `${BASE_URL_SIAKAD}/api`,
});

export {
  auth,
  api,
  api_siakad,
  storage,
  BASE_URL,
  BASE_URL_SIAKAD,
  url_auth,
  url_api,
  url_storage,
};
