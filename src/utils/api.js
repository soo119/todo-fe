import axios from "axios";

const BASE =
  process.env.REACT_APP_BACKEND_PROXY4 ||
  "https://todo-be-2-00e6fd783c2a.herokuapp.com"; // ← Heroku URL fallback (끝에 / 없음)

console.log("API BASE =", BASE); // 배포 후 콘솔에서 실제 값 확인용

const api = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
