import { Button } from "#front/components/ui/button";
import { createAuthLogoutApi } from "#front/signal/api/auth.signal";
import { useColorMode } from "@kobalte/core";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div class="p-2">
      <h3 class="">Welcome Home!</h3>
      <M />
      <LogoutButton />
    </div>
  );
}

function M() {
  const { toggleColorMode } = useColorMode();
  return <Button on:click={toggleColorMode}>Halo</Button>;
}

function LogoutButton() {
  const query = createAuthLogoutApi();
  return (
    <Button on:click={() => query.mutate()} variant="outline">
      Logout
    </Button>
  );
}
