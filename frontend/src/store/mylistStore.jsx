import { create } from "zustand";
import axios from "axios";
import { server } from "../App";

export const mylistStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  addToList: async (userId, itemId, itemType) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server + `api/mylist/add`, {
        userId,
        itemId,
        itemType,
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

  deleteToList: async (userId, saveId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.delete(
        server + `api/mylist/delete/${saveId}/${userId}`,
      );
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
