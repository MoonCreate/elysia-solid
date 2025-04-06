import { splitProps, type Component, ValidComponent } from "solid-js";

import * as TooltipPrimitive from "@kobalte/core/tooltip";

import { type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "#front/lib/utilities";

const TooltipTrigger = TooltipPrimitive.Trigger;

const Tooltip: Component<TooltipPrimitive.TooltipRootProps> = (properties) => {
  return <TooltipPrimitive.Root gutter={4} {...properties} />;
};

type TooltipContentProperties<T extends ValidComponent = "div"> =
  TooltipPrimitive.TooltipContentProps<T> & { class?: string | undefined };

const TooltipContent = <T extends ValidComponent = "div">(
  properties: PolymorphicProps<T, TooltipContentProperties<T>>,
) => {
  const [local, others] = splitProps(properties as TooltipContentProperties, [
    "class",
  ]);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "z-50 origin-[var(--kb-popover-content-transform-origin)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          local.class,
        )}
        {...others}
      />
    </TooltipPrimitive.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };
