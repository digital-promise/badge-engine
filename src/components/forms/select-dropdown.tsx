/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Select, {
  components,
  type GroupBase,
  type DropdownIndicatorProps,
  type Props,
  type CSSObjectWithLabel,
  ControlProps,
} from "react-select";
import Icon from "~/components/icon";

export function transformEnum(enumProp: any) {
  const enumValues = Object.values(enumProp);
  const enumObject = enumValues.map((option) => {
    return { value: option as string, label: option as string };
  });

  return enumObject;
}

export default function DropdownSelection<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group> & { className?: string, error?: boolean }) {
  const DropdownIndicator = (
    props: DropdownIndicatorProps<Option, IsMulti, Group>,
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icon name="arrow-line-down" />
      </components.DropdownIndicator>
    );
  };

  const style = {
    control: (base: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...base,
      border: props.error ? 0 : base.border,
      boxShadow: props.error ? "none" : base.boxShadow,
    }),
  }

  return (
    <Select
      {...props}
      components={{
        DropdownIndicator,
        Input: (inputProps) => (
          <components.Input {...inputProps} aria-activedescendant={undefined} />
        ),
      }}
      instanceId="long-value-select"
      className={`z-10 ${props.className}`}
      styles={style}
    ></Select>
  );
}
