/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import { ContexProvider } from "./context";
import { BASE_PATH } from "./constanst";

const router = createRouter({ routeTree, basepath: BASE_PATH });
const queryClient = new QueryClient();

const root = document.querySelector("#root") ?? document.body;

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
render(
  () => (
    <QueryClientProvider client={queryClient}>
      <ContexProvider>
        <RouterProvider router={router} />
      </ContexProvider>
    </QueryClientProvider>
  ),
  root,
);
