import axios from "axios";
import type { ApiResponse, JobPayload } from "../types/api.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const jobService = {
  dispatch: async (payload: JobPayload): Promise<ApiResponse> => {
    const { data } = await axios.post<ApiResponse>(
      `${API_URL}/jobs/dispatch`,
      payload,
    );
    return data;
  },
};
