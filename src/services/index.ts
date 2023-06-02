import { BASE_URL, TIME_OUT } from "@/services/config";
import Cache from "@/utils/cache";
import Request from "@/services/request";

const API = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = Cache.get("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
});

export default API;
