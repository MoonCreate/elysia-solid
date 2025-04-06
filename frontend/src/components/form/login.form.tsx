import { JSX } from "solid-js";
import { cn } from "#front/lib/utilities";
import { createAuthLoginApi } from "#front/signal/api/auth.signal";
import { Button } from "../ui/button";
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/text-field";
import { GithubIcon } from "../icons/github.icon";

function LoginForm() {
  const query = createAuthLoginApi();
  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    query.mutate({
      email: data.get("email") + "",
      password: data.get("password") + "",
    });
  };
  return (
    <div class="grid grid-cols-2">
      <div class=" rounded-l-md border isolate relative after:m-auto after:absolute after:bg-primary after:size-15 after:rounded-full after:inset-0" />
      {/* form */}
      <form
        on:submit={onSubmit}
        class="space-y-5 p-5 border rounded-r-md min-w-80"
      >
        <h2 class="text-4xl font-semibold mb-5">Login.</h2>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            required
          />
        </TextField>

        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="password">Password</TextFieldLabel>
          <TextFieldInput
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </TextField>

        <Button class="w-full" type="submit">
          Login
        </Button>

        <div
          class={cn(
            "relative isolate place-content-center flex ",
            "before:absolute before:h-px before:bg-muted before:inset-0 before:my-auto before:-z-1",
            "after:content-['OR_CONTINUE_WITH'] after:text-muted-foreground after:text-xs after:w-max after:bg-background after:px-2",
          )}
        />

        <Button class="w-full" variant="secondary">
          <GithubIcon />
          Github
        </Button>

        <p class="text-muted-foreground w-60 text-sm text-center mx-auto">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </div>
  );
}

export { LoginForm };
