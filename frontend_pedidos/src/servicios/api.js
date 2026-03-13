import axios from "axios";

const API = axios.create({
  baseURL: "https://desirable-reprieve-production-76ee.up.railway.app/api/v1"
});

export default API;
