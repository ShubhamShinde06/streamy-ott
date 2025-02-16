import { create } from "zustand";
import axios from "axios";
import {server} from '../App'

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
      const response = await axios.post(server +`api/mix/content/${id}`);
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

  likeCounts: async (userId, contentId, contentType ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server +`api/mix/toggle-like`, {userId, contentId, contentType });
      set({
        likeds: response.data.liked, 
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  likeCheckCounts: async (userId, contentId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(server +`api/mix/check-like/${userId}/${contentId}`, );
      set({
        likeds: response.data.isLiked, 
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  saved: async (userId, itemId ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server +`api/save/add`, {userId, itemId });
      set({
        Data: response.data.data, 
        message: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error save item",
        isLoading: false,
      });
    }
  },




}));
