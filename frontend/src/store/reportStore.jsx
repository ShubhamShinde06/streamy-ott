import { create } from "zustand";
import axios from "axios";
import { server } from "../App";

export const reportStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  reportAdd: async (userId, itemId, itemType, selectedIssue, description) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server + `api/report/add`, {
        userId,
        itemId,
        itemType,
        selectedIssue,
        description,
      });
      set({
        Data: response.data.data,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error addToList",
        isLoading: false,
      });
    }
  },
}));
