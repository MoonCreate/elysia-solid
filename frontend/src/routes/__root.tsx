import { getRefreshToken } from "#front/api";
import { LoginForm } from "#front/components/form/login.form";
import { getMustLogin } from "#front/signal/validation/authcheck.signal";
import { createRootRoute, Outlet } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div class="grid place-content-center min-h-screen">
      {getMustLogin() && !getRefreshToken() ? <LoginForm /> : <Outlet />}
      <TanStackRouterDevtools />
    </div>
  );
}
