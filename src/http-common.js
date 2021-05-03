import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://13.212.243.248:8080/api"
      : "http://localhost:8080/api",
});
