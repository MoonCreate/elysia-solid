import { splitProps } from "solid-js";

import * as SeparatorPrimitive from "@kobalte/core/separator";

import { type ValidComponent } from "solid-js";
import { type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "#front/lib/utilities";

type SeparatorRootProperties<T extends ValidComponent = "hr"> =
  SeparatorPrimitive.SeparatorRootProps<T> & { class?: string | undefined };

const Separator = <T extends ValidComponent = "hr">(
  properties: PolymorphicProps<T, SeparatorRootProperties<T>>,
) => {
  const [local, others] = splitProps(properties as SeparatorRootProperties, [
    "class",
    "orientation",
  ]);
  return (
    <SeparatorPrimitive.Root
      orientation={local.orientation ?? "horizontal"}
      class={cn(
        "shrink-0 bg-border",
        local.orientation === "vertical" ? "w-px self-stretch" : "h-px w-full",
        local.class,
      )}
      {...others}
    />
  );
};

export { Separator };
