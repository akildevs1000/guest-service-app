import axios from "axios";

const api = axios.create({
  // baseURL: "https://hms-backend.test/api", // ✅ your base URL here
  baseURL: "https://backend.myhotel2cloud.com/api", // ✅ your base URL here
  // You can add headers here if needed
});

export default api;
