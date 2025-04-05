import {
  api,
  getRefreshToken,
  InferError,
  invalidateToken,
  setToken,
} from "#front/api";
import { createMutation } from "@tanstack/solid-query";
import { toast } from "solid-sonner";

const createAuthLoginApi = () =>
  createMutation(() => ({
    mutationFn: async (payload: Parameters<typeof api.auth.login.post>[0]) => {
      const { data, error } = await api.auth.login.post(payload);
      if (error) throw error;
      return data;
    },

    onError: (error: InferError<typeof api.auth.login.post>) => {
      switch (error.status) {
        case 404:
          return toast.error("Password or email doesnt match our record");
        case 422:
          return toast.error(error.value.message);
        default:
          // @ts-expect-error
          return toast.error(`${error.status}: ${error.value}`);
      }
    },

    onSuccess: (data) => {
      setToken(data.accessToken, data.refreshToken);
      toast.success("Login Successfull!");
    },
  }));

const createAuthLogoutApi = () =>
  createMutation(() => ({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return { success: true };
      const { error, data } = await api.auth.logout.post({ refreshToken });
      console.log(data);
      if (error) throw error;
    },

    onError: (error: InferError<typeof api.auth.logout.post>) => {
      switch (error.status) {
        case 422:
          return toast.error(error.value.message);
        default:
          return toast.error(`${error.status}: ${error.value}`);
      }
    },

    onSuccess: () => {
      invalidateToken();
      toast.success("Logout Successfull!");
    },
  }));

export { createAuthLoginApi, createAuthLogoutApi };
