import { createGreetIndexApi } from "#front/signal/api/index.signal";
import { setMustLogin } from "#front/signal/validation/authcheck.signal";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal } from "solid-js";

export const Route = createFileRoute("/about")({
  component: About,
  beforeLoad: () => {
    setMustLogin(true);
  },
});

function About() {
  const [getName, setName] = createSignal("mama");
  const query = createGreetIndexApi(() => getName());
  return (
    <div>
      <div class="p-2">{query.data}</div>
      <input value={getName()} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
