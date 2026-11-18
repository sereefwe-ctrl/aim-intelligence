import { cn } from "@/lib/cn";

/** Near full-bleed container with slim gutters, editorial style. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1600px] px-4 sm:px-6", className)}
      {...props}
    />
  );
}
