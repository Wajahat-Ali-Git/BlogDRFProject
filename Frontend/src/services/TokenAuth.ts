import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

api.interceptors.request.use((config) => {
  const tokenData = localStorage.getItem("token");

  if (tokenData && tokenData !== "undefined" && tokenData !== "null") {
    try {
      const parsedData = JSON.parse(tokenData);
      const token = parsedData?.access || parsedData;

      if (
        token &&
        typeof token === "string" &&
        token !== "undefined" &&
        token !== "null"
      ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      if (typeof tokenData === "string" && !tokenData.includes("{")) {
        config.headers.Authorization = `Bearer ${tokenData}`;
      }
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't tried to refresh yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokenData = localStorage.getItem("token");

      if (tokenData) {
        try {
          const parsedData = JSON.parse(tokenData);
          const refreshToken = parsedData.refresh;

          if (refreshToken) {
            // Attempt to refresh the token
            const res = await axios.post("http://localhost:8000/api/accounts/token/refresh/", {
              refresh: refreshToken,
            });

            if (res.status === 200) {
              const newAccessToken = res.data.access;
              
              // Update localStorage with the new access token
              parsedData.access = newAccessToken;
              localStorage.setItem("token", JSON.stringify(parsedData));

              // Update the original request's header and retry
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }

      // If we reach here, refresh failed or was impossible
      console.warn("Session expired - clearing token");
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);
