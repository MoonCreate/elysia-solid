import { createRootRoute, Outlet, useRouter } from "@tanstack/solid-router";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { getRefreshToken } from "#front/api";
import { LoginForm } from "#front/components/form/login.form";
import { AppSidebar } from "#front/components/sidebar/app.sidebar";
import { Dialog, DialogContent } from "#front/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "#front/components/ui/sidebar";
import { getMustLogin } from "#front/signal/validation/authcheck.signal";

const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  return (
    <SidebarProvider>
      <AppSidebar />
      <Dialog
        open={getMustLogin() && !getRefreshToken()}
        onOpenChange={() => router.history.back()}
      >
        <DialogContent class="p-0 max-w-none w-max">
          <LoginForm />
        </DialogContent>
      </Dialog>
      <div class="grow bg-sidebar p-2.5 max-md:p-0">
        <main class="min-h-full bg-background rounded-md border dark:border-none">
          <div class="border-b items-center p-2 flex gap-2">
            <SidebarTrigger />
            <div class="bg-border w-px self-stretch" />
            Document
          </div>
          {getMustLogin() && !getRefreshToken() ? <></> : <Outlet />}
          <TanStackRouterDevtools />
        </main>
      </div>
    </SidebarProvider>
  );
}

export { Route };
