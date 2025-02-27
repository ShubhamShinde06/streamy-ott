import { create } from "zustand";
import axios from "axios";
import { server } from "../App";

export const mixStore = create((set) => ({
  Data: null,
  visitCount: 0,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticted: null,
  message: null,

  viewCount: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server + `api/mix/content/${id}`);
      set({
        visitCount: response.data.visitCount,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },
}));
