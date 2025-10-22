// hooks/useApiRequest.js
import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3002";

export const useApiRequest = (baseUrl = BASE_URL) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (endpoint, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      setError(null);
      try {
        const axiosConfig = {
          url: `${baseUrl}${endpoint}`,
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          withCredentials: true,
        };

        if (body && method !== "GET" && method !== "DELETE") {
          axiosConfig.data = body;
        }

        const response = await axios(axiosConfig);
        setData(response.data);
        return response.data;
      } catch (err) {
        console.error("API Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { data, error, loading, request };
};