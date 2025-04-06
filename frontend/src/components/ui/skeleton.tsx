import { splitProps } from "solid-js";

import * as SkeletonPrimitive from "@kobalte/core/skeleton";

import { type ValidComponent } from "solid-js";
import { type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "#front/lib/utilities";

type SkeletonRootProperties<T extends ValidComponent = "div"> =
  SkeletonPrimitive.SkeletonRootProps<T> & { class?: string | undefined };

const Skeleton = <T extends ValidComponent = "div">(
  properties: PolymorphicProps<T, SkeletonRootProperties<T>>,
) => {
  const [local, others] = splitProps(properties as SkeletonRootProperties, [
    "class",
  ]);
  return (
    <SkeletonPrimitive.Root
      class={cn(
        "bg-primary/10 data-[animate='true']:animate-pulse",
        local.class,
      )}
      {...others}
    />
  );
};

export { Skeleton };
