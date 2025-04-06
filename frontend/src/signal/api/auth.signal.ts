import { createMutation } from "@tanstack/solid-query";
import { toast } from "solid-sonner";
import {
  api,
  getRefreshToken,
  InferError,
  invalidateToken,
  setToken,
} from "#front/api";

const createAuthLoginApi = () =>
  createMutation(() => ({
    mutationFn: async (payload: Parameters<typeof api.auth.login.post>[0]) => {
      const { data, error } = await api.auth.login.post(payload);
      if (error) throw error;
      return data;
    },

    onError: (error: InferError<typeof api.auth.login.post>) => {
      switch (error.status) {
        case 404: {
          return toast.error("Password or email doesnt match our record");
        }
        case 422: {
          return toast.error(error.value.message);
        }
        default: {
          return toast.error(
            // @ts-expect-error it ussualy stated when server is error
            `${error.status}: ${error.value ?? "Server Error"}`,
          );
        }
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
      const { error } = await api.auth.logout.post({ refreshToken });
      if (error) throw error;
    },

    onError: (error: InferError<typeof api.auth.logout.post>) => {
      switch (error.status) {
        case 422: {
          return toast.error(error.value.message);
        }
        default: {
          return toast.error(`${error.status}: ${error.value}`);
        }
      }
    },

    onSuccess: () => {
      invalidateToken();
      toast.success("Logout Successfull!");
    },
  }));

export { createAuthLoginApi, createAuthLogoutApi };
