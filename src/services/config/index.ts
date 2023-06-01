let BASE_URL: string;
const TIME_OUT = 10000;

if (import.meta.env.PROD) {
  BASE_URL = "http://123.207.32.32:5000";
} else {
  BASE_URL = "http://123.207.32.32:5000";
}

export { BASE_URL, TIME_OUT };
