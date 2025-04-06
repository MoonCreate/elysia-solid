import { Toaster as Sonner } from "solid-sonner";
import { type Component, type ComponentProps } from "solid-js";

type ToasterProperties = ComponentProps<typeof Sonner>;

const Toaster: Component<ToasterProperties> = (properties) => {
  return (
    <Sonner
      class="toaster group"
      toastOptions={{
        classes: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...properties}
    />
  );
};

export { Toaster };
