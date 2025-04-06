import { Treaty, treaty } from "@elysiajs/eden";
import { createSignal, untrack } from "solid-js";
import cookie from "js-cookie";
import { type App } from "#back/index";
import {
  API_URL,
  STORAGE_ACCESS_TOKEN_KEY,
  STORAGE_REFRESH_TOKEN_KEY,
} from "#front/constanst";
import { createLocalStorageSignal } from "#front/signal/storage/create-local.signal";

let defaultAccessToken;

if (globalThis.window !== undefined) {
  defaultAccessToken = cookie.get(STORAGE_ACCESS_TOKEN_KEY);
}

const [getAccessToken, setAccessToken] = createSignal<string | undefined>(
  defaultAccessToken,
);
const [getRefreshToken, setRefreshToken] = createLocalStorageSignal<string>({
  key: STORAGE_REFRESH_TOKEN_KEY,
  type: "string",
  outsideComponent: true,
});

const setToken = (accessToken: string, refreshToken: string) => {
  setAccessToken(accessToken);
  cookie.set(STORAGE_ACCESS_TOKEN_KEY, accessToken, { expires: 30 / 86_400 });
  setRefreshToken(refreshToken);
};

const invalidateToken = () => {
  setAccessToken(undefined);
  setRefreshToken(undefined);
  cookie.remove(STORAGE_ACCESS_TOKEN_KEY);
};

// @ts-expect-error too much error i cant handle it
const api = treaty<App>(API_URL, {
  headers: (_, options) => {
    const token = getAccessToken();
    return {
      ...options.headers,
      authorization: token ? `Bearer ${token}` : undefined,
    };
  },

  fetcher: async (input, init) => {
    let response = await fetch(input, init);
    if (response.status === 401) {
      const token = untrack(() => getRefreshToken());
      const responseRefresh = await fetch(
        new URL("/api/auth/refresh?token=" + token, API_URL),
      );
      if (!responseRefresh.ok) {
        invalidateToken();
        return response;
      }
      const newToken = await responseRefresh.text();
      setAccessToken(newToken);
      cookie.set(STORAGE_ACCESS_TOKEN_KEY, newToken, { expires: 30 / 86_400 });

      response = await fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          authorization: `Bearer ${newToken}`,
        },
      });
    }
    return response;
  },
}).api;

type InferError<
  T extends (
    ...arguments_: never[]
  ) => Promise<Treaty.TreatyResponse<Record<number, unknown>>>,
> = NonNullable<Awaited<ReturnType<T>>["error"]>;

export {
  api,
  setToken,
  getAccessToken,
  getRefreshToken,
  invalidateToken,
  type InferError,
};
