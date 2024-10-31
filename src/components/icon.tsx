import type { DPGIconId } from "@digitalpromise/icons/dist/dpg-icons"
import { dpgIcons } from "~/assets/fonts";
import "@digitalpromise/icons/dist/dpg-icons.css";

export default function Icon({
  name,
  className,
}: {
  name: DPGIconId;
  className?: string;
}) {
  return (
    <span
      className={`${dpgIcons.variable} font-icon dpg-icons-${name} font-normal align-middle text-lg inline-block leading-6 h-5 ${className ?? ""}`}
    ></span>
  );
}
