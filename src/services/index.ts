import { BASE_URL, TIME_OUT } from "@/services/config";
import Request from "@/services/request";

const API = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

export default API;
